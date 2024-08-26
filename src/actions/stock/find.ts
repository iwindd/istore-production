"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";
import { Product, StockItem as StockItemOriginal, Stock as StockOriginal } from "@prisma/client";

interface StockItem extends StockItemOriginal{
  product: Product
}

interface Stock extends StockOriginal { 
  items?: StockItem[]
}

const GetStock = async (id : number, includeItem?: boolean): Promise<ActionResponse<Stock | null>> => {
  try {
    const session = await getServerSession();
    const stock = await db.stock.findFirst({
      where: {
        id: id,
        store_id: Number(session?.user.store),
      },
      ...(includeItem ? {
        include: {
          items: {
            include: {
              product: true
            }
          },
        }
      } : {})
    })

    return {
      success: true,
      data: stock 
    };
  } catch (error) {
    return ActionError(error) as ActionResponse<Stock | null>;
  }
};

export default GetStock;
