"use client";

import { MapPin, Trophy, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { FormField } from "@/components/form/FormField";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";

import { useCreateTournament } from "../tournament.queries";
import {
  createTournamentSchema,
  type CreateTournamentFormData,
  type CreateTournamentInput,
} from "../tournament.schema";
import type { CreateTournamentModalProps } from "../tournament.types";

const INITIAL_FORM_DATA: CreateTournamentFormData = {
  name: "",
  city: "",
  state: "",
  logoUrl: "",
};

type FieldErrors = Partial<Record<keyof CreateTournamentFormData, string>>;

export function CreateTournamentModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateTournamentModalProps) {
  const [formData, setFormData] =
    useState<CreateTournamentFormData>(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setFieldErrors({});
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const updateField = useCallback(
    <K extends keyof CreateTournamentFormData>(
      field: K,
      value: CreateTournamentFormData[K],
    ) => {
      setFormData((current) => ({ ...current, [field]: value }));
      setFieldErrors((current) => {
        if (!current[field]) return current;
        const nextErrors = { ...current };
        delete nextErrors[field];
        return nextErrors;
      });
    },
    [],
  );

  const { mutate: createTournamentMutation, isPending } = useCreateTournament({
    onSuccess: (tournament) => {
      toast.success("Tournament created successfully!");
      handleClose();
      onSuccess?.(tournament);
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create tournament. Please try again.";
      toast.error(message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = createTournamentSchema.safeParse(formData);

    if (!validationResult.success) {
      const errors: FieldErrors = {};
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as keyof CreateTournamentFormData;
        if (fieldName && !errors[fieldName]) {
          errors[fieldName] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    const cleanedInput: CreateTournamentInput = {
      name: validationResult.data.name,
      city: validationResult.data.city?.trim() || undefined,
      state: validationResult.data.state?.trim() || undefined,
      logoUrl: validationResult.data.logoUrl?.trim() || undefined,
    };

    createTournamentMutation(cleanedInput);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl transition-all animate-in zoom-in-95 duration-200">
        {/* Top Gradient Banner */}
        <div className="h-1.5 w-full bg-linear-to-r from-zinc-800 via-zinc-600 to-zinc-900" />

        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-xs">
              <Trophy className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h2
                id="modal-title"
                className="text-lg font-bold tracking-tight text-zinc-950"
              >
                Create New Tournament
              </h2>
              <p className="mt-0.5 text-xs text-zinc-500">
                Set up a new championship to manage teams, venues, and fixtures.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
          {/* Tournament Name */}
          <FormField
            label="Tournament Name"
            required
            error={fieldErrors.name}
            htmlFor="tournament-name"
          >
            <Input
              id="tournament-name"
              name="name"
              placeholder="e.g. Mumbai Premier Cup 2026"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              error={Boolean(fieldErrors.name)}
              autoFocus
              className="h-10 text-xs"
            />
          </FormField>

          {/* Location Grid (City & State) */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField
              label="City"
              error={fieldErrors.city}
              htmlFor="tournament-city"
            >
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                <Input
                  id="tournament-city"
                  name="city"
                  placeholder="e.g. Mumbai"
                  value={formData.city ?? ""}
                  onChange={(e) => updateField("city", e.target.value)}
                  error={Boolean(fieldErrors.city)}
                  className="h-10 pl-9 text-xs"
                />
              </div>
            </FormField>

            <FormField
              label="State / Region"
              error={fieldErrors.state}
              htmlFor="tournament-state"
            >
              <Input
                id="tournament-state"
                name="state"
                placeholder="e.g. Maharashtra"
                value={formData.state ?? ""}
                onChange={(e) => updateField("state", e.target.value)}
                error={Boolean(fieldErrors.state)}
                className="h-10 text-xs"
              />
            </FormField>
          </div>

          {/* Logo URL */}
          <FormField
            label="Logo URL"
            optional
            error={fieldErrors.logoUrl}
            htmlFor="tournament-logo"
            description="Provide a public URL to your tournament banner or logo image."
          >
            <Input
              id="tournament-logo"
              name="logoUrl"
              placeholder="https://example.com/logo.png"
              value={formData.logoUrl ?? ""}
              onChange={(e) => updateField("logoUrl", e.target.value)}
              error={Boolean(fieldErrors.logoUrl)}
              className="h-10 text-xs font-mono"
            />
          </FormField>

          {/* Action Buttons Footer */}
          <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-zinc-100 pt-5">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isPending}
              loadingText="Creating Tournament..."
            >
              Create Tournament
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
