"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";
import { Category } from "@prisma/client";

const DeleteCategory = async (
  id: number
): Promise<ActionResponse<Category>> => {
  try {
    const session = await getServerSession();
    const data = await db.category.delete({
      where: {
        id: id,
        store_id: Number(session?.user.store),
      },
    });

    return { success: true, data: data };
  } catch (error) {
    return ActionError(error) as ActionResponse<Category>;
  }
};

export default DeleteCategory;
