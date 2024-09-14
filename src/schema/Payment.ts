import { z } from "zod";

const CartItemSchema = z.object({
  id: z.number(),
  serial: z.string(),
  label: z.string(),
  price: z.number(),
  count: z.number(),
  stock: z.number(),
  category: z.object({
    overstock: z.boolean()
  }).nullable()
});

export const PaymentSchema = z
  .object({
    method: z.enum(["cash", "bank"]),
    note: z.string(),
    cart: z.array(CartItemSchema).min(1),
  })

export type PaymentValues = z.infer<typeof PaymentSchema>;
