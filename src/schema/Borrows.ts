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
    count: z.number().min(1),
  })
  .refine((data) => data.count <= (data.product?.stock || 0), val => ({
    message: `จำนวนการเบิกไม่ถูกต้อง (สต๊อก : ${val.product.stock})`,
    path: ["count"],
  }));

export type BorrowsValues = z.infer<typeof BorrowsSchema>;
