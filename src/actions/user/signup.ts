"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import { SignUpSchema, SignUpValues } from "@/schema/Signup";
import bcrypt from "bcrypt";
import db from "@/libs/db";

const Signup = async (
  payload: SignUpValues
): Promise<ActionResponse<SignUpValues>> => {
  try {
    const validated = SignUpSchema.parse(payload);
    await db.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: await bcrypt.hash(validated.password, 15),
        stores: {
          create: [{ name: validated.name }],
        },
      },
    });

    return { success: true, data: validated };
  } catch (error) {
    return ActionError(error) as ActionResponse<SignUpValues>;
  }
};

export default Signup;
