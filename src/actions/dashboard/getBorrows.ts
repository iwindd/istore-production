"use server";
import { Borrows } from "@prisma/client";
import db from "@/libs/db";
import { getFilterRange } from "./range";

const getBorrows = async (store: number): Promise<Borrows[]> => {
  try {
    return await db.borrows.findMany({
      where: {
        store_id: store,
        ...await getFilterRange()
      },
    });
  } catch (error) {
    return [];
  }
};

export default getBorrows;
