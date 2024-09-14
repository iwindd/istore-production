"use client";
import React from "react";
import { enqueueSnackbar } from "notistack";
import Scanner from "@/components/Scanner";
import { CartProduct, useCart } from "@/hooks/use-cart";

const Cashier = () => {
  const { addProduct } = useCart();

  const onSubmit = (xItem: CartProduct) => {
    addProduct(xItem);
    enqueueSnackbar(`เพิ่มสินค้า <${xItem.label}> เข้าตะกร้าแล้ว!`, {
      variant: "success",
    });
  };

  return <Scanner onSubmit={onSubmit} />;
};

export default Cashier;