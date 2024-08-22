"use server";
import { TableFetch } from "@/components/Datatable";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { filter, order } from "@/libs/formatter";
import { getServerSession } from "@/libs/session";
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
          ...filter(table.filter, ['label']),
          store_id: Number(session?.user.store),
        },
        include: {
          _count: {
            select: {
              product: true,
            }
          }
        }
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
