"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";

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
      orderBy: {
        sold: "desc"
      },
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
