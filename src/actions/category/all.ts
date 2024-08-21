"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";
import { Category } from "@prisma/client";

const GetAllCategories = async (): Promise<ActionResponse<Category[]>> => {
  try {
    const session = await getServerSession();
    const categories = await db.category.findMany({
      where: {
        store_id: Number(session?.user.store),
      },
    });

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    return ActionError(error) as ActionResponse<Category[]>;
  }
};

export default GetAllCategories;
