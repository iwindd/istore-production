"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";

const UpdateLineToken = async (
  token: string
): Promise<ActionResponse<string>> => {
  try {
    const session = await getServerSession();
    await db.store.update({
      where: {
        id: Number(session?.user.store),
      },
      data: {
        line_token: token,
      },
    });

    return { success: true, data: token };
  } catch (error) {
    return ActionError(error) as ActionResponse<string>;
  }
};

export default UpdateLineToken;
