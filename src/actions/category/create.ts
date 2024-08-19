"use server";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { getServerSession } from "@/lib/session";
import { CategorySchema, CategoryValues } from "@/schema/Category";

const CreateCategory = async (
  payload: CategoryValues
): Promise<ActionResponse<CategoryValues>> => {
  try {
    const session = await getServerSession();
    const validated = CategorySchema.parse(payload);
    await db.category.create({
      data: {
        label: validated.label,
        store_id: Number(session?.user.store),
      },
    });

    return { success: true, data: validated };
  } catch (error) {
    return ActionError(error) as ActionResponse<CategoryValues>;
  }
};

export default CreateCategory;
