"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";
import { PurchaseSchema, PurchaseValues } from "@/schema/Purchase";

const CreatePurchase = async (
  payload: PurchaseValues
): Promise<ActionResponse<PurchaseValues>> => {
  try {
    const session = await getServerSession();
    const validated = PurchaseSchema.parse(payload);
    const totalCost = validated.cost * validated.count;

    await db.order.create({
      data: {
        price: 0,
        cost: totalCost,
        profit: 0 - (totalCost),
        type: "PURCHASE",
        note: payload.note,
        text: payload.label,
        store_id: Number(session?.user.store),
        products: {
          create: [
            {
              serial: "-",
              label: payload.label,
              category: "-",
              price: 0,
              cost: payload.cost,
              count: payload.count,
              overstock: false,
            }
          ]
        }
      },
    });

    return { success: true, data: validated };
  } catch (error) {
    return ActionError(error) as ActionResponse<PurchaseValues>;
  }
};

export default CreatePurchase;
