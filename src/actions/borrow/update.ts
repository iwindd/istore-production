"use server";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { getServerSession } from "@/lib/session";

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
      await db.product.update({
        where: {
          id: data.product_id
        },
        data: {
          stock: {
            increment: data.amount - data.count
          }
        }
      })
    }

    return { success: true, data: true };
  } catch (error) {
    return ActionError(error) as ActionResponse<boolean>;
  }
};

export default UpdateBorrow;
