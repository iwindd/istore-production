"use server";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { getServerSession } from "@/lib/session";
import { Product } from "@prisma/client";

const DeleteProduct = async (id: number): Promise<ActionResponse<Product>> => {
  try {
    const session = await getServerSession();
    const data = await db.product.delete({
      where: {
        id: id,
        store_id: Number(session?.user.store),
      },
    });

    return { success: true, data: data };
  } catch (error) {
    return ActionError(error) as ActionResponse<Product>;
  }
};

export default DeleteProduct;
