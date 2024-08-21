import { z } from "zod";

export const BorrowsSchema = z
  .object({
    productId: z.number(),
    note: z.string(),
    count: z.number(),
  })
  .required();

export type BorrowsValues = z.infer<typeof BorrowsSchema>;
