import { z } from "zod";

export const createTournamentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tournament name must be at least 2 characters.")
    .max(100, "Tournament name cannot exceed 100 characters."),

  city: z
    .string()
    .trim()
    .max(100, "City name cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  state: z
    .string()
    .trim()
    .max(100, "State name cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  logoUrl: z
    .string()
    .trim()
    .url("Please enter a valid image URL.")
    .optional()
    .or(z.literal("")),
});

export type CreateTournamentFormData = z.infer<typeof createTournamentSchema>;

export type CreateTournamentInput = {
  name: string;
  city?: string;
  state?: string;
  logoUrl?: string;
};
