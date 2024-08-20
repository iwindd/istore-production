"use client";
import React from "react";
import { useRecoilState } from "recoil";
import { CartState } from "../../../atoms/cart";
import { enqueueSnackbar } from "notistack";
import { Product } from "@prisma/client";
import Scanner from "@/components/Scanner";

const Cashier = () => {
  const [, setCart] = useRecoilState(CartState);

  const onSubmit = (xItem: Product) => {
    setCart((prev) => {
      const item = prev.find((i) => i.serial === xItem.serial);

      if (item) {
        return prev.map((i) =>
          i.serial === xItem.serial ? { ...i, count: i.count + 1 } : i
        );
      } else {
        return [
          {
            ...xItem,
            count: 1,
          },
          ...prev,
        ];
      }
    });
    enqueueSnackbar(`เพิ่มสินค้า <${xItem.label}> เข้าตะกร้าแล้ว!`, {
      variant: "success",
    });
  };

  return <Scanner onSubmit={onSubmit} />;
};

export default Cashier;