"use client";
import { Button, Paper, Stack, Typography } from "@mui/material";
import AddController from "./components/add-controller";
import { SaveTwoTone } from "@mui/icons-material";
import { useStock } from "@/hooks/use-stock";
import { Confirmation, useConfirm } from "@/hooks/use-confirm";
import { enqueueSnackbar } from "notistack";
import { useInterface } from "@/providers/InterfaceProvider";
import StockDatatable from "./components/datatable";

const Stocks = () => {
  const { stocks, commit } = useStock();
  const { setBackdrop } = useInterface();

  const confirmation = useConfirm({
    title: "แจ้งเตือน",
    text: "คุณต้องการจะจัดการสต๊อกหรือไม่ ?",
    onConfirm: async () => {
      setBackdrop(true);
      try {
        const state = await commit();
        if (!state) throw Error("error");
        enqueueSnackbar("จัดการสต๊อกสินค้าสำเร็จแล้ว!", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("ไม่สามารถทำรายการได้ กรุณาลองอีกครั้งภายหลัง!", {
          variant: "error",
        });
      } finally {
        setBackdrop(false);
      }
    },
  });

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems={"center"} spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">สต๊อก</Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          ></Stack>
        </Stack>
        <>
          <AddController />
        </>
      </Stack>
      <StockDatatable />
      <Paper sx={{ py: 1 }}>
        <Stack direction={"row"} justifyContent={"end"}>
          <div>
            <Button
              color="inherit"
              endIcon={<SaveTwoTone />}
              onClick={confirmation.handleOpen}
            >
              จัดการสต๊อก
            </Button>
          </div>
        </Stack>
      </Paper>
      <Confirmation {...confirmation.props} />
    </Stack>
  );
};

export default Stocks;
