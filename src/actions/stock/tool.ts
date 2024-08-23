"use server";
import {
  ImportFromMinStockPayload,
  ImportPayload,
  ImportType,
} from "@/app/stocks/import";
import { StockItem } from "@/atoms/stock";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";
import { Session } from "next-auth";

const ImportMinStock = async (
  payload: ImportFromMinStockPayload,
  session: Session
): Promise<StockItem[]> => {
  const data = await db.product.findMany({
    where: {
      store_id: Number(session.user.store),
      stock: {
        lte: payload.product_min_stock
          ? db.product.fields.stock_min
          : payload.value,
      },
    },
    select: {
      id: true,
      serial: true,
      label: true,
      stock: true,
    },
  });

  return data.map((p) => ({ ...p, payload: 0 })) as StockItem[];
};

const ImportToolAction = async (
  payload: ImportPayload
): Promise<ActionResponse<StockItem[]>> => {
  try {
    const session = await getServerSession();
    if (!session) throw Error("no_found_session");
    let resp: StockItem[] = [];

    if (payload.type == ImportType.FromMinStock)
      resp = await ImportMinStock(payload, session);

    return { success: true, data: resp };
  } catch (error) {
    return ActionError(error) as ActionResponse<StockItem[]>;
  }
};

export default ImportToolAction;
