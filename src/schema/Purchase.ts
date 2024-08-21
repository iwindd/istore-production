import { z } from "zod";

export const PurchaseSchema = z.object({
  label: z.string().min(3),
  cost: z.number(),
  count: z.number(),
  note: z.string().optional()
}).required();

export type PurchaseValues = z.infer<typeof PurchaseSchema>;
