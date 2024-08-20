"use client";
import { PaymentSchema, PaymentValues } from "@/schema/Payment";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { KeyboardEvent, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCart } from "./use-cart";
import { money } from "@/lib/formatter";
const Keys = ["Space"];

interface PaymentDialogProps {
  open: boolean;
  onClose(): void;
}

const PaymentDialog = ({ open, onClose }: PaymentDialogProps) => {
  const { cart, total } = useCart();
  const [receipt, setReceipt] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentValues>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      cart: cart,
      type: "cash",
    },
  });

  useEffect(() => {
    setValue("cart", cart);
  }, [cart]);

  const onSubmit: SubmitHandler<PaymentValues> = async (
    payload: PaymentValues
  ) => {
    console.log("submit");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <DialogTitle>ชำระเงิน</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Stack direction={"row"} justifyContent={"space-between"} mb={1}>
            <Typography variant="caption">ยอดสุทธิ</Typography>
            <Typography variant="caption">{money(total())}</Typography>
          </Stack>
          <TextField
            autoFocus
            fullWidth
            label="จำนวนเงิน"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">฿</InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {money((watch("money") || 0) - total())}฿
                </InputAdornment>
              ),
            }}
            error={!!errors["money"]?.message}
            helperText={errors["money"]?.message}
            {...register("money", { valueAsNumber: true })}
          />
          <TextField
            label="หมายเหตุ"
            type="text"
            fullWidth
            error={!!errors["note"]?.message}
            helperText={errors["note"]?.message}
            {...register("note")}
          />
          <FormControl fullWidth>
            <InputLabel id="payment">ช่องทางการชำระเงิน</InputLabel>
            <Select
              labelId="payment"
              label="ช่องทางการชำระเงิน"
              value={watch("type")}
              {...register("type")}
            >
              <MenuItem value={"cash"}>เงินสด</MenuItem>
              <MenuItem value={"bank"}>ธนาคาร</MenuItem>
            </Select>
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value={receipt}
                  onChange={(e) => setReceipt(e.target.checked)}
                />
              }
              label="ฉันต้องการใบเสร็จ"
            />
          </FormGroup>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={onClose}>
          ยกเลิก
        </Button>
        <Button type="submit">ตกลง</Button>
      </DialogActions>
    </Dialog>
  );
};

interface PaymentHook {
  IsOpen: boolean;
  Dialog: React.ReactNode;
}

const usePayment = (): PaymentHook => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { total } = useCart();

  const onClose = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    if (total() <= 0) {
      if (isOpen) setIsOpen(false);
      return;
    }

    setIsOpen(!isOpen);
  };

  const onKeydown = (key: KeyboardEvent) => {
    if (Keys.includes(key.code)) toggle();
  };

  useEffect(() => {
    const handleKeydown = (event: Event) =>
      onKeydown(event as unknown as KeyboardEvent);

    document.addEventListener("keydown", handleKeydown, false);

    return () => {
      document.removeEventListener("keydown", handleKeydown, false);
    };
  }, [onKeydown]);

  return {
    IsOpen: isOpen,
    Dialog: <PaymentDialog open={isOpen} onClose={onClose} />,
  };
};

export default usePayment;
