"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";
import { Stock } from "@prisma/client";

const GetStock = async (id : number): Promise<ActionResponse<Stock | null>> => {
  try {
    const session = await getServerSession();
    const stock = await db.stock.findFirst({
      where: {
        id: id,
        store_id: Number(session?.user.store),
      },
    })

    return {
      success: true,
      data: stock 
    };
  } catch (error) {
    return ActionError(error) as ActionResponse<Stock | null>;
  }
};

export default GetStock;
