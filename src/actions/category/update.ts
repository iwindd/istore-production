"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";
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

    if (payload.active){
      await db.product.updateMany({
        where: {
          category_id: null
        },
        data: {
          category_id: id
        }
      })
    }

    return { success: true, data: validated };
  } catch (error) {
    return ActionError(error) as ActionResponse<CategoryValues>;
  }
};

export default UpdateCategory;
