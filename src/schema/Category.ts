import { z } from "zod";

export const CategorySchema = z.object({
  label: z.string(),
}).required();

export type CategoryValues = z.infer<typeof CategorySchema>;
