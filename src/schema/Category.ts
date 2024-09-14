import { z } from "zod";

export const CategorySchema = z.object({
  label: z.string(),
  active: z.boolean()
}).required();

export type CategoryValues = z.infer<typeof CategorySchema>;
