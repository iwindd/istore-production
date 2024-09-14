"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";
import { CategorySchema, CategoryValues } from "@/schema/Category";

const CreateCategory = async (
  payload: CategoryValues
): Promise<ActionResponse<CategoryValues>> => {
  try {
    const session = await getServerSession();
    const validated = CategorySchema.parse(payload);
    const category = await db.category.create({
      data: {
        label: validated.label,
        store_id: Number(session?.user.store),
        overstock: validated.overstock
      },
    });

    if (payload.active){
      await db.product.updateMany({
        where: {
          category_id: null
        },
        data: {
          category_id: category.id
        }
      })
    }

    return { success: true, data: validated };
  } catch (error) {
    return ActionError(error) as ActionResponse<CategoryValues>;
  }
};

export default CreateCategory;
