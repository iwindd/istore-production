"use server";
import { Order } from "@prisma/client";
import db from "@/libs/db";
import { getFilterRange } from "./range";

const getOrders = async (store: number): Promise<Order[]> => {
  try {
    return await db.order.findMany({
      where: {
        store_id: store,
        ...await getFilterRange()
      },
    });
  } catch (error) {
    return [];
  }
};

export default getOrders;
