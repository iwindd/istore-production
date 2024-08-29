"use server";
import { StockItem } from "@/atoms/stock";
import { ActionError, ActionResponse } from "@/libs/action";
import { getServerSession } from "@/libs/session";
import db from "@/libs/db";

interface StockItemMinimal {
  changed_by: number;
  product_id: number;
  stock_id?: number
}

const UpdateStock = async (payload: StockItemMinimal[], batchSize = 20) => {
  for (let i = 0; i < payload.length; i += batchSize) {
    const batch = payload.slice(i, i + batchSize);
    await db.$transaction(
      batch.map((product) => {
        return db.product.update({
          where: {
            id: product.product_id,
            deleted: null,
          },
          data: { stock: { increment: product.changed_by } },
        });
      })
    );
  }

  console.log("[INFO] UPDATE STOCKS SUCCESS");
};

const CreateItems = async (payload: StockItemMinimal[], batchSize = 10) => {
  for (let i = 0; i < payload.length; i += batchSize) {
    const batch = payload.slice(i, i + batchSize);
    await db.stockItem.createMany({
      data: batch.map(payload => ({
        ...payload,
        stock_id: payload.stock_id as number
      })), 
    })
  }
};

const validateProducts = async (payload: StockItem[], storeId: number) => {
  const rawProducts = await db.product.findMany({
    where: {
      store_id: storeId,
      id: { in: payload.map((p) => p.id) },
      deleted: null
    },
    select: {
      id: true,
    },
  });

  const validated = rawProducts.map((product) => {
    const data = payload.find((p) => p.id == product.id) as StockItem;
    return {
      changed_by: data.payload,
      product_id: product.id,
    };
  }) as StockItemMinimal[];

  return validated;
};

const Commit = async (
  payload: StockItem[],
  target: number | null,
  instant?: boolean,
  note?: string
): Promise<ActionResponse<StockItem[]>> => {
  try {
    const session = await getServerSession();
    if (!session) throw Error("no_found_session");
    payload = payload.slice(0, 50);

    const data = await db.stock.upsert({
      where: {
        id: target || -1
      },
      create: {
        note: note || "",
        state: instant ? "SUCCESS" : "PROGRESS",
        store_id: Number(session.user.store),
      },
      update: {
        note: note || "",
        state: "SUCCESS",
      },
      select: {
        id: true,
        items: {
          select: {
            product_id: true,
            changed_by: true,
          },
        },
      },
    });

    if (!target && data.items.length <= 0) {
      const validated = await validateProducts(payload, Number(session.user.store))
      data.items = validated.map((product) => ({
        changed_by: product.changed_by,
        product_id: product.product_id,
        stock_id: data.id
      }))
      await CreateItems(data.items);
    }
    
    if (instant || target != null) UpdateStock(data.items);
    
    return { success: true, data: payload };
  } catch (error) {
    console.error(error);
    return ActionError(error) as ActionResponse<StockItem[]>;
  }
};

export default Commit;
