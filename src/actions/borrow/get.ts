"use server";
import { TableFetch } from "@/components/Datatable";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { order } from "@/lib/formatter";
import { getServerSession } from "@/lib/session";
import { Borrows } from "@prisma/client";

const GetBorrows = async (
  table: TableFetch
): Promise<ActionResponse<Borrows[]>> => {
  try {
    const session = await getServerSession();
    const borrows = await db.$transaction([
      db.borrows.findMany({
        skip: table.pagination.page * table.pagination.pageSize,
        take: table.pagination.pageSize,
        orderBy: order(table.sort),
        where: {
          store_id: Number(session?.user.store),
        },
      }),
      db.borrows.count({
        where: {
          store_id: Number(session?.user.store),
        },
      }),
    ]);

    return {
      success: true,
      data: borrows[0],
      total: borrows[1],
    };
  } catch (error) {
    return ActionError(error) as ActionResponse<Borrows[]>;
  }
};

export default GetBorrows;
