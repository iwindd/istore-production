"use server";
import { OrderProduct } from "@prisma/client";
import db from "@/libs/db";
import { getFilterRange } from "./range";

const getOverstocks = async (store: number): Promise<OrderProduct[]> => {
  try {
    return await db.orderProduct.findMany({
      where: {
        order: {
          store_id: store,
          ...await getFilterRange()
        },
        overstock: {
          gte: 1,
        },
        overstock_at: null,
      },
    });
  } catch (error) {
    return [];
  }
};

export default getOverstocks;
