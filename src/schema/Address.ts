import { z } from "zod";
import { StoreAddress } from "../../next-auth";

export const AddressSchema = z.object({
  address: z.string(),
  district: z.string(),
  area: z.string(),
  province: z.string(),
  postalcode: z.string()
});

export type AddressValues = z.infer<typeof AddressSchema>;


export const FormatAddress = (address : AddressValues) : StoreAddress | null => {
  const storeAddress : StoreAddress | null = {
    address: address.address || undefined,
    district: address.district || undefined,
    area: address.area || undefined,
    province: address.province || undefined,
    postalcode: address.postalcode || undefined
  }

  return Object.values(storeAddress).some(val => val != undefined) ? storeAddress : null
}