"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Cashier from "./components/Cashier";
import { Confirmation, useConfirm } from "@/hooks/use-confirm";
import { Button } from "@mui/material";
import { useRecoilState } from "recoil";
import { CartState } from "../../atoms/cart";
import dynamic from "next/dynamic";
import { DeleteTwoTone } from "@mui/icons-material";

const CartContainer = dynamic(() => import("./components/Cart"), {
  ssr: false,
});

const CashierPage = () => {
  const [, setCart] = useRecoilState(CartState);

  const confirmation = useConfirm({
    title: "แจ้งเตือน",
    text: "คุณต้องการจะล้างตะกร้าหรือไม่? สินค้าภายในตะกร้าจะถูกลบและไม่สามารถย้อนกลับได้!",
    onConfirm: async () => setCart([]),
  });

  const onPayment = () => {
    
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Cashier onPayment={onPayment} />
        </Grid>
        <Grid xs={9}>
          <CartContainer />
        </Grid>
        <Grid>
          <Button variant="contained" color="warning" startIcon={<DeleteTwoTone/>} onClick={confirmation.handleOpen}>ล้างตะกร้า</Button>
          <Confirmation {...confirmation.props} />
        </Grid>
      </Grid>
    </>
  )
}

export default CashierPage