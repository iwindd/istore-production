import { isValid } from "@/libs/ean";
import { z } from "zod";

export const ProductSchema = z
  .object({
    serial: z.string().min(10).max(15),
    label: z.string().min(3).max(60),
    price: z.number(),
    cost: z.number(),
    stock_min: z.number(),
    keywords: z.string(),
    category_id: z.number(),
  })
  .required();

export type ProductValues = z.infer<typeof ProductSchema>;

export const ProductFindSchema = z
  .object({
    serial: z.string(),
  })
  .refine((data) => isValid(data.serial), {
    message: "Invalid EAN",
    path: ["serial"],
  });

export type ProductFindValues = z.infer<typeof ProductFindSchema>;
