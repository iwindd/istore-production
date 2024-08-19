"use server";
import { TableFetch } from "@/components/Datatable";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { order } from "@/lib/formatter";
import { getServerSession } from "@/lib/session";
import { Category } from "@prisma/client";

const GetCategories = async (
  table: TableFetch
): Promise<ActionResponse<Category[]>> => {
  try {
    const session = await getServerSession();
    const categories = await db.$transaction([
      db.category.findMany({
        skip: table.pagination.page * table.pagination.pageSize,
        take: table.pagination.pageSize,
        orderBy: order(table.sort),
        where: {
          store_id: Number(session?.user.store),
        },
      }),
      db.category.count({
        where: {
          store_id: Number(session?.user.store),
        },
      }),
    ]);

    return {
      success: true,
      data: categories[0],
      total: categories[1],
    };
  } catch (error) {
    return ActionError(error) as ActionResponse<Category[]>;
  }
};

export default GetCategories;
