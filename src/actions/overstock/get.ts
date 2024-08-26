"use server";
import { TableFetch } from "@/components/Datatable";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { filter, order } from "@/libs/formatter";
import { getServerSession } from "@/libs/session";
import { OrderProduct } from "@prisma/client";

const GetOverstocks = async (
  table: TableFetch
): Promise<ActionResponse<OrderProduct[]>> => {
  try {
    const session = await getServerSession();
    const products = await db.$transaction([
      db.orderProduct.findMany({
        skip: table.pagination.page * table.pagination.pageSize,
        take: table.pagination.pageSize,
        orderBy: order(table.sort.length > 0 ? table.sort : [ { field: "overstock_at", sort: "asc"}]),
        where: {
          ...filter(table.filter, ["serial", "label", "category"]),
          order: {
            store_id: Number(session?.user.store),
          },
          overstock: {
            gte: 1
          }
        },
        include: {
          order: {
            select: {
              id: true,
              created_at: true,
              note: true
            }
          }
        }
      }),
      db.orderProduct.count({
        where: {
          order: {
            store_id: Number(session?.user.store),
          },
          overstock: {
            gte: 1
          }
        },
      }),
    ]);

    return {
      success: true,
      data: products[0],
      total: products[1],
    };
  } catch (error) {
    return ActionError(error) as ActionResponse<OrderProduct[]>;
  }
};

export default GetOverstocks;
