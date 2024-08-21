"use server";
import { Order } from "@prisma/client";
import db from "@/libs/db";

const getOrders = async (store: number): Promise<Order[]> => {
  try {
    return await db.order.findMany({
      where: {
        store_id: store,
      },
    });
  } catch (error) {
    return [];
  }
};

export default getOrders;
