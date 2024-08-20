"use server";
import { StockItem } from "@/atoms/stock";
import { ActionError, ActionResponse } from "@/lib/action";
import { getServerSession } from "@/lib/session";
import db from "@/lib/db";

const Commit = async (
  payload: StockItem[]
): Promise<ActionResponse<StockItem[]>> => {
  try {
    const session = await getServerSession();
    if (!session) throw Error("no_found_session");

    await db.$transaction(
      payload.map((product) => {
        return db.product.update({
          where: {
            id: product.id,
            store_id: Number(session.user.store),
          },
          data: { stock: { increment: product.payload } },
        });
      })
    );

    return { success: true, data: payload };
  } catch (error) {
    return ActionError(error) as ActionResponse<StockItem[]>;
  }
};

export default Commit;
