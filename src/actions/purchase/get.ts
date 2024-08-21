"use server";
import { TableFetch } from "@/components/Datatable";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { order } from "@/lib/formatter";
import { getServerSession } from "@/lib/session";

export interface Purchase {
  id: number,
  created_at: Date,
  cost: number,
  text: string,
  note: string,
  products: {
    count: number
  }[]
}

const GetPurchase = async (
  table: TableFetch
): Promise<ActionResponse<Purchase[]>> => {
  try {
    const session = await getServerSession();
    const purchase = await db.$transaction([
      db.order.findMany({
        skip: table.pagination.page * table.pagination.pageSize,
        take: table.pagination.pageSize,
        orderBy: order(table.sort),
        where: {
          store_id: Number(session?.user.store),
          type: "PURCHASE"
        },
        select: {
          id: true,
          created_at: true,
          cost: true,
          text: true,
          note: true,
          products: {
            select: {
              count: true
            }
          }
        }
      }),
      db.order.count({
        where: {
          store_id: Number(session?.user.store),
          type: "PURCHASE"
        },
      }),
    ]);

    return {
      success: true,
      data: purchase[0],
      total: purchase[1],
    };
  } catch (error) {
    return ActionError(error) as ActionResponse<Purchase[]>;
  }
};

export default GetPurchase;
