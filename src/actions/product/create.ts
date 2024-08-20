"use server";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { getServerSession } from "@/lib/session";
import { ProductSchema, ProductValues } from "@/schema/Product";

const CreateProduct = async (
  payload: ProductValues
): Promise<ActionResponse<ProductValues>> => {
  try {
    const session = await getServerSession();
    const validated = ProductSchema.parse(payload);
    await db.product.create({
      data: {
        serial: validated.serial,
        label: validated.label,
        price: validated.price,
        cost: validated.cost,
        stock: validated.stock,
        sold: 0,
        store_id: Number(session?.user.store),
        category_id: validated.category_id,
        keywords: validated.keywords
      },
    });

    return { success: true, data: validated };
  } catch (error) {
    return ActionError(error) as ActionResponse<ProductValues>;
  }
};

export default CreateProduct;
