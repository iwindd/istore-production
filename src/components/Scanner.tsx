"use client";
import GetProduct from "@/actions/product/find";
import { TextField } from "@mui/material";
import { Product } from "@prisma/client";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";

interface ScannerProps {
  onSubmit(Product: Product): void;
}

const Scanner = (props: ScannerProps) => {
  const [serial, setSerial] = React.useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const ref = React.useRef<HTMLInputElement | null>(null);

  const onSubmit = async () => {
    try {
      const _serial = serial;
      setSerial("");
      const resp = await GetProduct(_serial);

      if (!resp || !resp.data) throw Error(resp.message);

      props.onSubmit(resp.data);
      if (ref.current) ref.current.focus();
    } catch (error) {
      enqueueSnackbar("ไม่พบสินค้านี้ในระบบ", { variant: "error" });
    }
  };

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, [ref])

  return (
    <form action={onSubmit}>
      <TextField
        autoFocus
        fullWidth
        required 
        placeholder="รหัสสินค้า EAN8 OR EAN13"
        ref={ref}
        label="รหัสสินค้า"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
      />
    </form>
  );
};

export default Scanner;
