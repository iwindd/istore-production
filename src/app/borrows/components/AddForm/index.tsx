"use client";
import CreateBorrow from "@/actions/borrow/create";
import { SearchProduct } from "@/actions/product/search";
import Selector from "@/components/Selector";
import { useInterface } from "@/providers/InterfaceProvider";
import { BorrowsSchema, BorrowsValues } from "@/schema/Borrows";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTwoTone } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddForm = () => {
  const [selectProduct, setSelectProduct] =
    React.useState<SearchProduct | null>(null);
  const queryClient = useQueryClient();
  const { setBackdrop } = useInterface();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BorrowsValues>({
    resolver: zodResolver(BorrowsSchema),
  });

  const onSelect = (product: SearchProduct | null) =>
    setValue("product", product as SearchProduct);

  const onSubmit: SubmitHandler<BorrowsValues> = async (
    payload: BorrowsValues
  ) => {
    try {
      setBackdrop(true);
      const resp = await CreateBorrow(payload);
      if (!resp.success) throw Error("error");
      reset();
      await queryClient.refetchQueries({
        queryKey: ["borrows"],
        type: "active",
      });
      enqueueSnackbar("บันทึกการซื้อสินค้าเรียบร้อยแล้ว!", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง", {
        variant: "error",
      });
    } finally {
      setBackdrop(false);
    }
  };

  return (
    <Card component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <CardHeader title="เพิ่มรายการเบิก" />
      <Divider />
      <CardContent>
        <Stack spacing={1}>
          <Selector 
            onSubmit={onSelect} 
            fieldProps={{
              error: errors["product"] !== undefined,
              helperText: errors["product"]?.message,
            }}
          />
          <TextField
            label="จำนวน"
            error={errors["count"] !== undefined}
            helperText={errors["count"]?.message}
            {...register("count", { valueAsNumber: true })}
          />
          <TextField
            label="หมายเหตุ"
            error={errors["note"] !== undefined}
            helperText={errors["note"]?.message}
            placeholder="เช่น ชื่อผู้ใช้ รหัสการสั่งจอง คำอธิบาย ข้อมูล คำชี้แจงเพิ่มเติม หรือ อื่นๆ"
            {...register("note")}
          />
        </Stack>
      </CardContent>
      <Divider />
      <CardActions disableSpacing>
        <Button type="submit" startIcon={<AddTwoTone />} sx={{ ml: "auto" }}>
          เพิ่ม
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddForm;
