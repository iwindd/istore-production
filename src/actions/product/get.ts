"use server";
import { TableFetch } from "@/components/Datatable";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { filter, order } from "@/libs/formatter";
import { getServerSession } from "@/libs/session";
import { Product } from "@prisma/client";

const GetProducts = async (
  table: TableFetch
): Promise<ActionResponse<Product[]>> => {
  try {
    const session = await getServerSession();
    const products = await db.$transaction([
      db.product.findMany({
        skip: table.pagination.page * table.pagination.pageSize,
        take: table.pagination.pageSize,
        include: {
          category: {
            select: {
              label: true
            }
          }
        },
        orderBy: order(table.sort.length > 0 ? table.sort : [ { field: "updated_at", sort: "desc"}]),
        where: {
          ...filter(table.filter, ["serial", "label", "keywords"]),
          store_id: Number(session?.user.store),
          deleted: null
        },
      }),
      db.product.count({
        where: {
          store_id: Number(session?.user.store),
          deleted: null
        },
      }),
    ]);

    return {
      success: true,
      data: products[0],
      total: products[1],
    };
  } catch (error) {
    console.log('catch', error);
    
    return ActionError(error) as ActionResponse<Product[]>;
  }
};

export default GetProducts;
