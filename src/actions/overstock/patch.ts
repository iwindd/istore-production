"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";

const PatchOverstock = async (id: number): Promise<ActionResponse<boolean>> => {
  try {
    const session = await getServerSession();
    await db.orderProduct.update({
      where: {
        id: id,
        order: {
          store_id: Number(session?.user.store),
        },
      },
      data: {
        overstock_at: new Date(),
      },
    });

    return { success: true, data: true };
  } catch (error) {
    return ActionError(error) as ActionResponse<boolean>;
  }
};

export default PatchOverstock;
