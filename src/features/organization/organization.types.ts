import type { UseMutationOptions } from "@tanstack/react-query";

export interface CreateOrganizationRequest {
  name: string;
  displayName?: string;
  city?: string;
  state?: string;
}

export interface OrganizationOnboardingStatus {
  onboarded: boolean;
}

export interface OnboardingFormData {
  name: string;
  displayName: string;
  city: string;
  state: string;
}

export type FieldErrors = Partial<Record<keyof OnboardingFormData, string>>;

export type OnboardingSuccessModalProps = Pick<
  CreateOrganizationRequest,
  "name" | "displayName" | "city" | "state"
> & {
  onContinue: () => void;
};

export type CreateOrganizationResult = void;

export type CreateOrganizationMutationOptions = Omit<
  UseMutationOptions<
    CreateOrganizationResult,
    Error,
    CreateOrganizationRequest
  >,
  "mutationFn"
>;
