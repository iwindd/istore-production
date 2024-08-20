"use server";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { getServerSession } from "@/lib/session";
import { Order, OrderProduct } from "@prisma/client";

interface History extends Order{
  products: OrderProduct[]
}

const GetHistory = async (
  id: number
): Promise<ActionResponse<History | null>> => {
  try {
    const session = await getServerSession();
    const history = await db.order.findFirst({
      where: {
        id: id,
        store_id: Number(session?.user.store),
      },
      include: {
        products: true
      }
    });

    return {
      success: true,
      data: history,
    };
  } catch (error) {
    return ActionError(error) as ActionResponse<History | null>;
  }
};

export default GetHistory;
