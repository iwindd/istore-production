"use server";
import { Stock } from "@prisma/client";
import db from "@/libs/db";
import { getFilterRange } from "./range";

const getStocks = async (store: number): Promise<Stock[]> => {
  try {
    return await db.stock.findMany({
      where: {
        store_id: store,
        ...await getFilterRange()
      },
    });
  } catch (error) {
    return [];
  }
};

export default getStocks;
