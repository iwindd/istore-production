"use server";
import {
  ImportFromMinStockPayload,
  ImportFromStockId,
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
      deleted: null
    },
    select: {
      id: true,
      serial: true,
      label: true,
      stock: true,
    },
    take: 50,
    orderBy: {
      sold: "desc"
    }
  });

  return data.map((p) => ({ ...p, payload: 0 })) as StockItem[];
};

const ImportStockId = async (
  payload: ImportFromStockId,
  session: Session
): Promise<StockItem[]> => {
  const validated = await db.stock.count({where: {id: payload.id, store_id: Number(session.user.store)}});
  if (!validated) throw Error("not_found_stock");
  const data = await db.stockItem.findMany({
    where: {
      stock_id: payload.id,
      product: {
        deleted: null
      }
    },
    select: {
      changed_by: true,
      product: {
        select: {
          id: true,
          serial: true,
          label: true,
          stock: true,
        }
      }
    },
  });

  return data.map((p) => ({ payload: p.changed_by, ...p.product })) as StockItem[];
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
    if (payload.type == ImportType.FromStockId)
      resp = await ImportStockId(payload, session)

    return { success: true, data: resp };
  } catch (error) {
    return ActionError(error) as ActionResponse<StockItem[]>;
  }
};

export default ImportToolAction;
