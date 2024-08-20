"use server";
import { CartItem } from "@/atoms/cart";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { getServerSession } from "@/lib/session";
import { PaymentSchema, PaymentValues } from "@/schema/Payment";
import { Session } from "next-auth";

const validateProducts = async (session: Session, cart: CartItem[]) => {
  const rawProducts = await db.product.findMany({
    where: {
      store_id: Number(session?.user.store),
      id: { in: cart.map((p) => p.id) },
    },
    include: {
      category: {
        select: {
          label: true,
        },
      },
    },
  });

  const validated = rawProducts.map((product) => {
    const count = (cart.find((p) => p.id == product.id) as CartItem).count;
    return {
      id: product.id,
      serial: product.serial,
      label: product.label,
      price: product.price,
      cost: product.cost,
      count: count,
      category: product.category.label,
      overstock: count > product.stock,
    };
  }) as {
    id: number;
    serial: string;
    label: string;
    price: number;
    cost: number;
    count: number;
    category: string;
    overstock: boolean;
  }[];

  return validated;
};

const Cashout = async (
  payload: PaymentValues
): Promise<ActionResponse<PaymentValues>> => {
  try {
    const session = await getServerSession();
    if (!session) throw Error("no_found_session");
    const validated = PaymentSchema.parse(payload);
    const products = await validateProducts(session, payload.cart);
    const totalPrice = products.reduce((total, item) => total + item.price * item.count, 0);
    const totalCost = products.reduce((total, item) => total + item.cost * item.count, 0);
    const totalProfit = totalPrice - totalCost;
    const type = payload.type == "bank" ? "BANK" : "CASH";

    // CREATE ORDER
    await db.order.create({
      data: {
        price: totalPrice,
        cost: totalCost,
        profit: totalProfit,
        type: type,
        note: payload.note,
        text: products.map((item) => item.label).join(", "),
        store_id: Number(session?.user.store),
        products: {
          create: products.map(({ id, ...product }) => ({
            ...product,
          })),
        },
      },
    });

    // UPDATE STOCK
    db.$transaction(
      products.map((product) => {
        return db.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: { decrement: product.count },
            sold: { increment: product.cost },
          },
        });
      })
    );

    return { success: true, data: validated };
  } catch (error) {
    return ActionError(error) as ActionResponse<PaymentValues>;
  }
};

export default Cashout;
