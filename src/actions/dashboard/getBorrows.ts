"use server";
import { Borrows } from "@prisma/client";
import db from "@/libs/db";

const getBorrows = async (store: number): Promise<Borrows[]> => {
  try {
    return await db.borrows.findMany({
      where: {
        store_id: store,
      },
    });
  } catch (error) {
    return [];
  }
};

export default getBorrows;
