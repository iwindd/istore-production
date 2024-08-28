"use server";
import db from "@/libs/db";
import { getFilterRange } from "./range";

const getOrders = async (store: number) => {
  try {
    return await db.order.findMany({
      orderBy: {
        id: "desc"
      },
      where: {
        store_id: store,
        ...await getFilterRange()
      },
      include: {
        products: {
          select: {
            id: true,
            serial: true,
            label: true,
            count: true,
            overstock: true,
            overstock_at: true,
          }
        }
      }
    });
  } catch (error) {
    return [];
  }
};

export default getOrders;
