"use server";
import { TableFetch } from "@/components/Datatable";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { filter, order } from "@/libs/formatter";
import { getServerSession } from "@/libs/session";
import { Stock as StockOriginal } from "@prisma/client";

interface Stock extends StockOriginal {
  _count: {
    items: number;
  };
}

const GetStocks = async (
  table: TableFetch
): Promise<ActionResponse<Stock[]>> => {
  try {
    const session = await getServerSession();
    const stocks = await db.$transaction([
      db.stock.findMany({
        skip: table.pagination.page * table.pagination.pageSize,
        take: table.pagination.pageSize,
        orderBy: order(
          table.sort.length > 0
            ? table.sort
            : [{ field: "created_at", sort: "desc" }]
        ),
        where: {
          ...filter(table.filter, ["note"]),
          store_id: Number(session?.user.store),
        },
        include: {
          _count: {
            select: {
              items: true,
            },
          },
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
      data: stocks[0],
      total: stocks[1],
    };
  } catch (error) {
    return ActionError(error) as ActionResponse<Stock[]>;
  }
};

export default GetStocks;
