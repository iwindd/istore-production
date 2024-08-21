"use server";
import { ActionError, ActionResponse } from "@/lib/action";
import db from "@/lib/db";
import { getServerSession } from "@/lib/session";
import { Borrows } from "@prisma/client";

interface BorrowStat{
  status: Borrows['status']
}

const GetBorrowStats = async (): Promise<ActionResponse<BorrowStat[]>> => {
  try {
    const session = await getServerSession();
    const borrows = await db.borrows.findMany({
      where: {
        store_id: Number(session?.user.store),
      },
      select: {
        status: true
      }
    });

    return {
      success: true,
      data: borrows,
    };
  } catch (error) {
    return ActionError(error) as ActionResponse<BorrowStat[]>;
  }
};

export default GetBorrowStats;
