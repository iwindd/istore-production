"use server";
import { TableFetch } from "@/components/Datatable";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { order } from "@/lib/formatter";
import { getServerSession } from "@/lib/session";
import { Order } from "@prisma/client";

const GetHistories = async (
  table: TableFetch
): Promise<ActionResponse<Order[]>> => {
  try {
    const session = await getServerSession();
    const histories = await db.$transaction([
      db.order.findMany({
        skip: table.pagination.page * table.pagination.pageSize,
        take: table.pagination.pageSize,
        orderBy: order(table.sort),
        where: {
          store_id: Number(session?.user.store),
        },
      }),
      db.order.count({
        where: {
          store_id: Number(session?.user.store),
        },
      }),
    ]);

    return {
      success: true,
      data: histories[0],
      total: histories[1],
    };
  } catch (error) {
    return ActionError(error) as ActionResponse<Order[]>;
  }
};

export default GetHistories;
