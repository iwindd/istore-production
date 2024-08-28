"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";
import { ProductSchema, ProductValues } from "@/schema/Product";

const UpdateProduct = async (
  payload: ProductValues,
  id: number
): Promise<ActionResponse<ProductValues>> => {
  try {
    const session = await getServerSession();
    const validated = ProductSchema.parse(payload);
    await db.product.update({
      where: {
        id: id,
        store_id: Number(session?.user.store),
      },
      data: { 
        label: validated.label,
        price: validated.price,
        cost: validated.cost,
        stock_min: validated.stock_min,
        category_id: validated.category_id,
        keywords: validated.keywords,
        deleted: null
      },
    });

    return { success: true, data: validated };
  } catch (error) {
    return ActionError(error) as ActionResponse<ProductValues>;
  }
};

export default UpdateProduct;
