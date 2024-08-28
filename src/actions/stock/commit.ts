"use server";
import { StockItem } from "@/atoms/stock";
import { ActionError, ActionResponse } from "@/libs/action";
import { getServerSession } from "@/libs/session";
import db from "@/libs/db";

interface StockItemMinimal {
  changed_by: number;
  product_id: number;
}

const UpdateStock = async (payload: StockItemMinimal[]) => {
  return await db.$transaction(
    payload.map((product) => {
      return db.product.update({
        where: {
          id: product.product_id,
          deleted: null
        },
        data: { stock: { increment: product.changed_by } },
      });
    })
  );
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

    const { items } = await db.stock.upsert({
      where: {
        id: target || -1
      },
      create: {
        note: note || "",
        state: instant ? "SUCCESS" : "PROGRESS",
        store_id: Number(session.user.store),
        items: {
          create: await validateProducts(payload, Number(session.user.store)),
        },
      },
      update: {
        note: note || "",
        state: "SUCCESS",
      },
      select: {
        items: {
          select: {
            product_id: true,
            changed_by: true,
          },
        },
      },
    });

    if (instant || target != null) UpdateStock(items);

    return { success: true, data: payload };
  } catch (error) {
    return ActionError(error) as ActionResponse<StockItem[]>;
  }
};

export default Commit;
