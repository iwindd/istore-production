"use server";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { getServerSession } from "@/lib/session";
import { BorrowsSchema, BorrowsValues } from "@/schema/Borrows";

const CreateBorrow = async (
  payload: BorrowsValues
): Promise<ActionResponse<BorrowsValues>> => {
  try {
    const session = await getServerSession();
    const validated = BorrowsSchema.parse(payload);
    const product = await db.product.findFirst({
      where: {
        id: payload.productId,
        store_id: Number(session?.user.store),
      },
    });

    if (!product) throw Error("not_found_product");

    await db.borrows.create({
      data: {
        amount: payload.count,
        note: payload.note,
        status: "PROGRESS",
        product_id: payload.productId,
        store_id: Number(session?.user.store)
      },
    });

    return { success: true, data: validated };
  } catch (error) {
    return ActionError(error) as ActionResponse<BorrowsValues>;
  }
};

export default CreateBorrow;
