"use server";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { getServerSession } from "@/lib/session";
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
        stock: validated.stock,
        category_id: validated.category_id,
        keywords: validated.keywords
      },
    });

    return { success: true, data: validated };
  } catch (error) {
    return ActionError(error) as ActionResponse<ProductValues>;
  }
};

export default UpdateProduct;
