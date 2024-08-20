import { z } from "zod";

const CartItemSchema = z.object({
  id: z.number(),
  serial: z.string(),
  label: z.string(),
  price: z.number(),
  count: z.number(),
  stock: z.number(),
});

export const PaymentSchema = z
  .object({
    type: z.enum(["cash", "bank"]),
    note: z.string(),
    money: z.number(),
    cart: z.array(CartItemSchema).min(1),
  })
/*   
// THE MONEY IS OPTIONAL VALUE
.refine(
    (data) =>
      data.money <
      data.cart.reduce((total, item) => total + item.price * item.count, 0),
    {
      message: "จำนวนเงินไม่ถูกต้อง",
      path: ["money"],
    }
); 
  
*/

export type PaymentValues = z.infer<typeof PaymentSchema>;
