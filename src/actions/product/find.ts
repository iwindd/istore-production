"use server";
import { TableFetch } from "@/components/Datatable";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { order } from "@/lib/formatter";
import { getServerSession } from "@/lib/session";
import { Product } from "@prisma/client";

const GetProduct = async (serial : string): Promise<ActionResponse<Product | null>> => {
  try {
    const session = await getServerSession();
    const product = await db.product.findFirst({
      where: {
        serial: serial,
        store_id: Number(session?.user.store),
      },
    })

    return {
      success: true,
      data: product 
    };
  } catch (error) {
    return ActionError(error) as ActionResponse<Product | null>;
  }
};

export default GetProduct;
