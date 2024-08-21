"use server";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { getServerSession } from "@/lib/session";

export interface SearchProduct{
  id: number,
  serial: string,
  stock: number,
  label: string
}

const SearchProducts = async (
  input: string
): Promise<ActionResponse<SearchProduct[]>> => {
  try {
    const session = await getServerSession();
    const products = await db.product.findMany({
      take: 5,
      where: {
        OR: [
          { label: { contains: input } },
          { serial: { contains: input } },
          { keywords: { contains: input } },
        ],
        store_id: Number(session?.user.store),
      },
      select: {
        id: true,
        serial: true,
        stock: true,
        label: true
      }
    });

    return {
      success: true,
      data: products,
    };
  } catch (error) {
    return ActionError(error) as ActionResponse<SearchProduct[]>;
  }
};

export default SearchProducts;
