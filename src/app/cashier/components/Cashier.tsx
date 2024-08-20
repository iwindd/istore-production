"use client";
import React from "react";
import { enqueueSnackbar } from "notistack";
import { Product } from "@prisma/client";
import Scanner from "@/components/Scanner";
import { useCart } from "@/hooks/use-cart";

const Cashier = () => {
  const { addProduct } = useCart();

  const onSubmit = (xItem: Product) => {
    addProduct(xItem);
    enqueueSnackbar(`เพิ่มสินค้า <${xItem.label}> เข้าตะกร้าแล้ว!`, {
      variant: "success",
    });
  };

  return <Scanner onSubmit={onSubmit} />;
};

export default Cashier;