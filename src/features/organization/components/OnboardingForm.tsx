"use client";

import { useCallback, useState } from "react";

import { FormField } from "@/components/form/FormField";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";

import { useCreateOrganization } from "../organization.queries";
import { createOrganizationSchema } from "../organization.schema";
import type {
  CreateOrganizationRequest,
  FieldErrors,
  OnboardingFormData,
} from "../organization.types";
import { OnboardingSuccessModal } from "./OnboardingSuccessModal";

const INITIAL_FORM_DATA: OnboardingFormData = {
  name: "",
  displayName: "",
  city: "",
  state: "",
};

const FIELD_ELEMENT_IDS: Partial<Record<keyof OnboardingFormData, string>> = {
  name: "organization-name",
  displayName: "display-name",
  city: "city",
  state: "state",
};

export function OnboardingForm() {
  const [formData, setFormData] =
    useState<OnboardingFormData>(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [createdOrganization, setCreatedOrganization] =
    useState<CreateOrganizationRequest | null>(null);

  const updateField = useCallback(
    <K extends keyof OnboardingFormData>(
      field: K,
      value: OnboardingFormData[K],
    ) => {
      setFormData((current) => ({ ...current, [field]: value }));
      setFieldErrors((current) => {
        if (!current[field]) {
          return current;
        }
        const nextErrors = { ...current };
        delete nextErrors[field];
        return nextErrors;
      });
    },
    [],
  );

  const { mutate: createOrganization, isPending: isSubmitting } =
    useCreateOrganization({
      onSuccess: (_data, variables) => {
        setCreatedOrganization(variables);
      },
      onError: (error) => {
        toast.error("Profile creation failed", error.message);
      },
    });

  const validateForm = (): CreateOrganizationRequest | null => {
    const validation = createOrganizationSchema.safeParse(formData);

    if (!validation.success) {
      const errors: FieldErrors = {};

      validation.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field !== "string" || !(field in INITIAL_FORM_DATA)) {
          return;
        }

        const fieldKey = field as keyof OnboardingFormData;

        if (!errors[fieldKey]) {
          errors[fieldKey] = issue.message;
        }
      });

      setFieldErrors(errors);

      const firstErrorField = (
        Object.keys(FIELD_ELEMENT_IDS) as Array<keyof OnboardingFormData>
      ).find((key) => errors[key]);

      if (firstErrorField && FIELD_ELEMENT_IDS[firstErrorField]) {
        const elementId = FIELD_ELEMENT_IDS[firstErrorField];
        setTimeout(() => {
          const element = document.getElementById(elementId!);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            if ("focus" in element && typeof element.focus === "function") {
              element.focus();
            }
          }
        }, 50);
      }

      return null;
    }

    setFieldErrors({});
    return validation.data;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validatedData = validateForm();
    if (!validatedData) {
      return;
    }

    createOrganization(validatedData);
  };

  if (createdOrganization) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12 flex items-center justify-center">
        <OnboardingSuccessModal
          name={createdOrganization.name}
          displayName={createdOrganization.displayName ?? ""}
          city={createdOrganization.city ?? ""}
          state={createdOrganization.state ?? ""}
          onContinue={() => {
            window.location.replace("/dashboard");
          }}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Section 01: Organization Details */}
          <section className="border-b border-slate-100 p-6 sm:p-8">
            <SectionHeader number="01" title="Organization details" />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <FormField
                label="organization name"
                htmlFor="organization-name"
                required
                error={fieldErrors.name}
              >
                <Input
                  id="organization-name"
                  value={formData.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Enter your full name"
                  maxLength={100}
                  error={Boolean(fieldErrors.name)}
                  disabled={isSubmitting}
                />
              </FormField>

              <FormField
                label="Display name"
                htmlFor="display-name"
                optional
                error={fieldErrors.displayName}
              >
                <Input
                  id="display-name"
                  value={formData.displayName}
                  onChange={(event) =>
                    updateField("displayName", event.target.value)
                  }
                  placeholder="e.g. Laxit"
                  maxLength={100}
                  error={Boolean(fieldErrors.displayName)}
                  disabled={isSubmitting}
                />
              </FormField>
            </div>
          </section>

          {/* Section 04: Personal Details */}
          <section className="p-6 sm:p-8">
            <SectionHeader number="04" title="Personal details" />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <FormField
                label="City"
                htmlFor="city"
                optional
                error={fieldErrors.city}
              >
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  placeholder="e.g. Surat"
                  maxLength={100}
                  error={Boolean(fieldErrors.city)}
                  disabled={isSubmitting}
                />
              </FormField>

              <FormField
                label="State"
                htmlFor="state"
                optional
                error={fieldErrors.state}
              >
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(event) => updateField("state", event.target.value)}
                  placeholder="e.g. Gujarat"
                  maxLength={100}
                  error={Boolean(fieldErrors.state)}
                  disabled={isSubmitting}
                />
              </FormField>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-950"
            >
              {isSubmitting && (
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                  aria-hidden="true"
                />
              )}

              {isSubmitting ? "Creating your profile..." : "Complete profile"}
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              You can update these details later from your profile settings.
            </p>
          </section>
        </form>
      </div>
    </main>
  );
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-xs font-bold text-slate-600">
        {number}
      </div>

      <h2 className="font-semibold text-slate-950">{title}</h2>
    </div>
  );
}
