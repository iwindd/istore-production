"use server";
import { ActionError, ActionResponse } from "@/libs/action";
import db from "@/libs/db";
import { getServerSession } from "@/libs/session";
import { ProfileSchema, ProfileValues } from "@/schema/Profile";

const UpdateProfile = async (
  payload: ProfileValues,
): Promise<ActionResponse<ProfileValues>> => {
  try {
    const session = await getServerSession();
    const validated = ProfileSchema.parse(payload);
    await db.user.update({
      where: {
        id: Number(session?.user.id),
      },
      data: {
        name: validated.name,
        email: validated.email,
      },
    });

    return { success: true, data: validated };
  } catch (error) {
    return ActionError(error) as ActionResponse<ProfileValues>;
  }
};

export default UpdateProfile;
