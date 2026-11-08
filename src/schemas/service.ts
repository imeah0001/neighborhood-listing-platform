import { z } from "zod";

// Strict contract for creating a merchant service listing.
// Provider ID and approval status are assigned by the server.
export const createServiceSchema = z
  .object({
    title: z.string().trim().min(5).max(120),
    hourly_rate: z.number().finite().min(0).max(10000),
    duration_minutes: z.number().int().min(15).max(1440),
    coverage_radius_miles: z.number().int().min(1).max(500),
  })
  .strict();

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
