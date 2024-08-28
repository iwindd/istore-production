"use server";
import { Product } from "@prisma/client";
import db from "@/libs/db";
import { getFilterRange } from "./range";

const getProducts = async (store: number): Promise<Product[]> => {
  try {
    return await db.product.findMany({
      where: {
        store_id: store,
        ...await getFilterRange(),
        deleted: null
      },
    });
  } catch (error) {
    return [];
  }
};

export default getProducts;
