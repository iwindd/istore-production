"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Cashier from "./components/Cashier";
import { Confirmation, useConfirm } from "@/hooks/use-confirm";
import { Button, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { DeleteTwoTone, PaymentTwoTone } from "@mui/icons-material";
import { useCart } from "@/hooks/use-cart";
import usePayment from "@/hooks/use-payment";

const CartContainer = dynamic(() => import("./components/Cart"), {
  ssr: false,
});

const CashierPage = () => {
  const { clear } = useCart();
  const { Dialog, toggle } = usePayment();

  const confirmation = useConfirm({
    title: "แจ้งเตือน",
    text: "คุณต้องการจะล้างตะกร้าหรือไม่? สินค้าภายในตะกร้าจะถูกลบและไม่สามารถย้อนกลับได้!",
    onConfirm: async () => clear(),
  });

  return (
    <>
      <Grid container spacing={1} direction={"row-reverse"}>
        <Grid xs={12}>
          <Cashier />
        </Grid>
        <Grid xs={12} lg={3}>
          <Stack spacing={1} direction={"row"}>
            <Button
              variant="contained"
              color="success"
              startIcon={<PaymentTwoTone />}
              onClick={toggle}
            >
              เช็คบิล
            </Button>
            <Button
              variant="contained"
              color="warning"
              startIcon={<DeleteTwoTone />}
              onClick={confirmation.handleOpen}
            >
              ล้างตะกร้า
            </Button>
          </Stack>
          <Confirmation {...confirmation.props} />
        </Grid>
        <Grid xs={12} lg={9}>
          <CartContainer />
        </Grid>
      </Grid>

      {Dialog}
    </>
  );
};

export default CashierPage;
