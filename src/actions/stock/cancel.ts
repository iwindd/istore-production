"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";
import { Stock } from "@prisma/client";

const CancelStock = async (id: number): Promise<ActionResponse<Stock>> => {
  try {
    const session = await getServerSession();
    const data = await db.stock.update({
      where: {
        id: id,
        store_id: Number(session?.user.store),
      },
      data: {
        state: "CANCEL",
        action_at: new Date()
      },
    });

    return { success: true, data: data };
  } catch (error) {
    return ActionError(error) as ActionResponse<Stock>;
  }
};

export default CancelStock;
