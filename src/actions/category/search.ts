"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";

export interface SearchCategory {
  id: number;
  label: string;
  overstock: boolean;
}

const SearchCategories = async (
  input: string
): Promise<ActionResponse<SearchCategory[]>> => {
  try {
    const session = await getServerSession();
    const products = await db.category.findMany({
      take: 5,
      where: {
        OR: [{ label: { contains: input } }],
        store_id: Number(session?.user.store),
      },
      select: {
        id: true,
        label: true,
        overstock: true,
      },
    });

    return {
      success: true,
      data: products,
    };
  } catch (error) {
    return ActionError(error) as ActionResponse<SearchCategory[]>;
  }
};

export default SearchCategories;
