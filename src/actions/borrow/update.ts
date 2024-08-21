"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";

const UpdateBorrow = async (
  borrowId: number,
  count: number
): Promise<ActionResponse<boolean>> => {
  try {
    const session = await getServerSession();
    const data = await db.borrows.update({
      where: {
        id: borrowId,
        store_id: Number(session?.user.store),
        status: "PROGRESS"
      },
      data: { 
        count: {
          increment: count
        },
        status: "SUCCESS"
      },
    });

    if (data && data.count < data.amount) {
      const product = await db.product.update({
        where: {
          id: data.product_id
        },
        data: {
          stock: {
            increment: data.amount - data.count
          }
        },
        include: {
          category: {
            select: {
              label: true
            }
          }
        }
      })

      if (data.count > 0 && session?.user.store) {
        const totalPrice = product.price * data.count
        const totalCost = product.cost * data.count
        await db.order.create({
          data: {
            price: totalPrice,
            cost: totalCost,
            profit: totalPrice-totalCost,
            note: data.note,
            text: product.label,
            store_id: +session?.user.store,
            method: "CASH",
            type: "BORROW",
            products: {
              create: [
                {
                  serial: product.serial,
                  label: product.label,
                  category: product.category.label,
                  price: product.price,
                  cost: product.cost,
                  count: data.count,
                  overstock: false
                }
              ]
            }
          }
        })
      }
    }

    return { success: true, data: true };
  } catch (error) {
    return ActionError(error) as ActionResponse<boolean>;
  }
};

export default UpdateBorrow;
