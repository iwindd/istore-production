"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";
import { PasswordSchema, PasswordValues } from "@/schema/Password";
import bcrypt from "bcrypt";

const UpdatePassword = async (
  payload: PasswordValues
): Promise<ActionResponse<null>> => {
  try {
    const session = await getServerSession();
    const validated = PasswordSchema.parse(payload);

    const user = await db.user.findFirst({
      where: {
        id: Number(session?.user.id),
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) throw new Error("not_found_user");
    const matchPassword = await bcrypt.compare(
      validated.old_password,
      user.password
    );
    if (!matchPassword) throw new Error("password_not_match");

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await bcrypt.hash(validated.password, 15),
      },
    });

    return { success: true, data: null };
  } catch (error) {
    return ActionError(error) as ActionResponse<null>;
  }
};

export default UpdatePassword;
