import { z } from "zod";

export const BorrowsSchema = z
  .object({
    product: z.object({
      id: z.number(),
      serial: z.string(),
      stock: z.number(),
      label: z.string(),
    }),
    note: z.string(),
    count: z.number(),
  })
  .refine((data) => data.count <= (data.product?.stock || 0), {
    message: "จำนวนการเบิกไม่ถูกต้อง",
    path: ["count"],
  });

export type BorrowsValues = z.infer<typeof BorrowsSchema>;
