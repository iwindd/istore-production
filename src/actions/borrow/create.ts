"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";
import { BorrowsSchema, BorrowsValues } from "@/schema/Borrows";

const CreateBorrow = async (
  payload: BorrowsValues
): Promise<ActionResponse<BorrowsValues>> => {
  try {
    const session = await getServerSession();
    BorrowsSchema.parse(payload);
    const product = await db.product.findFirst({
      where: {
        id: payload.product.id,
        store_id: Number(session?.user.store),
      },
    });
    const validated = BorrowsSchema.parse(payload); // revalidate
    if (!product) throw Error("not_found_product");

    await db.borrows.create({
      data: {
        amount: payload.count,
        note: payload.note,
        status: "PROGRESS",
        product_id: payload.product.id,
        store_id: Number(session?.user.store),
      },
    });

    await db.product.update({
      where: {
        id: payload.product.id,
      },
      data: {
        stock: {
          decrement: payload.count,
        },
      },
    });

    return { success: true, data: validated };
  } catch (error) {
    return ActionError(error) as ActionResponse<BorrowsValues>;
  }
};

export default CreateBorrow;
