"use server";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { getServerSession } from "@/lib/session";
import { CategorySchema, CategoryValues } from "@/schema/Category";

const UpdateCategory = async (
  payload: CategoryValues,
  id: number
): Promise<ActionResponse<CategoryValues>> => {
  try {
    const session = await getServerSession();
    const validated = CategorySchema.parse(payload);
    await db.category.update({
      where: {
        id: id,
        store_id: Number(session?.user.store),
      },
      data: { label: validated.label },
    });

    return { success: true, data: validated };
  } catch (error) {
    return ActionError(error) as ActionResponse<CategoryValues>;
  }
};

export default UpdateCategory;
