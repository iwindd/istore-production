import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z.string().min(6).max(60),
    email: z.string().email().min(6),
    password: z.string().min(6),
    password_confirmation: z.string().min(6),
  })
  .refine((data) => data.password == data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export type SignUpValues = z.infer<typeof SignUpSchema>;
