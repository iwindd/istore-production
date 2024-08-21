"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { AddTwoTone } from "@mui/icons-material";
import { useDialog } from "@/hooks/use-dialog";
import { useInterface } from "@/providers/InterfaceProvider";
import Scanner from "@/components/Scanner";
import { useStock } from "@/hooks/use-stock";
import { Product } from "@prisma/client";

interface StockDialogProps {
  onClose: () => void;
  open: boolean;
}

function StockFormDialog({
  open,
  onClose,
}: StockDialogProps): React.JSX.Element {
  const { stocks, addProduct } = useStock();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [changedBy, setChangedBy] = React.useState<string | number>();

  const reset = () => {
    setProduct(null);
    setChangedBy(0);
  };

  const Close = () => {
    reset();
    onClose();
  };

  const onSubmit = (product: Product) => {
    const stock = stocks.find(product => product.id == product.id);
    if (stock) setChangedBy(stock.payload);
    setProduct(product);
  }

  const onConfirm = () => {
    if (!product) return;
    if (!changedBy) return;
    addProduct(product, +changedBy);
    Close();
  };

  return (
    <Dialog open={open} onClose={Close} fullWidth disableRestoreFocus>
      <DialogTitle>
        {!product ? "ค้นหาสินค้า" : `สินค้า : ${product.label}`}
      </DialogTitle>
      <DialogContent>
        <Stack sx={{ mt: 2 }}>
          <Stack flexDirection={"column"} spacing={2}>
            {!product ? (
              <Scanner onSubmit={onSubmit} />
            ) : (
              <TextField 
                type="number"
                value={changedBy}
                onChange={(e) => setChangedBy(e.target.value)}
                fullWidth
                label="จำนวน"
              />
            )}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack
          sx={{ width: "100%" }}
          direction={"row"}
          justifyContent={product ? "space-between" : "end"}
        >
          {product && <Button onClick={reset}>เปลี่ยนสินค้า</Button>}

          <Stack direction={"row"}>
            <Button onClick={Close}>ปิด</Button>
            {product && <Button onClick={onConfirm}>บันทึก</Button>}
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

const AddController = () => {
  const dialog = useDialog();
  const { isBackdrop } = useInterface();

  return (
    <>
      <Button
        startIcon={<AddTwoTone />}
        variant="contained"
        onClick={dialog.handleOpen}
      >
        เพิ่มรายการ
      </Button>

      <StockFormDialog
        open={dialog.open && !isBackdrop}
        onClose={dialog.handleClose}
      />
    </>
  );
};

export default AddController;
