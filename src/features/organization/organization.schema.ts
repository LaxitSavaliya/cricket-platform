import { z } from "zod";

function optionalText(minimumMessage: string, maximumMessage: string) {
  return z
    .string()
    .trim()
    .max(100, { error: maximumMessage })
    .refine((value) => !value || value.length >= 2, {
      error: minimumMessage,
    })
    .optional()
    .transform((value) => value || undefined);
}

export const createOrganizationSchema = z.object({
  name: z
    .string({ error: "Organization name is required." })
    .trim()
    .min(1, { error: "Organization name is required." })
    .min(2, {
      error: "Organization name must contain at least 2 characters.",
    })
    .max(100, {
      error: "Organization name cannot exceed 100 characters.",
    }),

  displayName: optionalText(
    "Display name must contain at least 2 characters.",
    "Display name cannot exceed 100 characters.",
  ),

  city: optionalText(
    "City must contain at least 2 characters.",
    "City cannot exceed 100 characters.",
  ),

  state: optionalText(
    "State must contain at least 2 characters.",
    "State cannot exceed 100 characters.",
  ),
});

export type CreateOrganizationFormInput = z.input<
  typeof createOrganizationSchema
>;

export type ValidatedCreateOrganizationInput = z.output<
  typeof createOrganizationSchema
>;
