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
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { AddTwoTone } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { Category } from "@prisma/client";
import { useInterface } from "@/providers/InterfaceProvider";
import { CategorySchema, CategoryValues } from "@/schema/Category";
import { useDialog } from "@/hooks/use-dialog";
import CreateCategory from "@/actions/category/create";
import UpdateCategory from "@/actions/category/update";

interface AddDialogProps {
  onClose: () => void;
  open: boolean;
  category: Category | null;
}

export function CategoryFormDialog({
  open,
  onClose,
  category,
}: AddDialogProps): React.JSX.Element {
  const { setBackdrop } = useInterface();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CategoryValues>({ resolver: zodResolver(CategorySchema) });
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<CategoryValues> = async (
    payload: CategoryValues
  ) => {
    try {
      setBackdrop(true);
      const resp = await (!category ? CreateCategory(payload) : UpdateCategory(payload, category.id));
      if (!resp.success) throw Error("error");
      onClose();
      reset();
      await queryClient.refetchQueries({
        queryKey: ["categories"],
        type: "active",
      });
      enqueueSnackbar("บันทึกสินค้าเรียบร้อยแล้ว!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง", {
        variant: "error",
      });
    } finally {
      setBackdrop(false);
    }
  };

  React.useEffect(() => {
    setValue("label", category?.label || "");
  }, [category, setValue]);

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
      <DialogTitle>
        {category ? "แก้ไขประเภทสินค้า" : "เพิ่มประเภทสินค้า"}
      </DialogTitle>
      <DialogContent>
        <Stack sx={{ mt: 2 }}>
          <TextField
            label="ประเภทสินค้า"
            fullWidth
            {...register("label")}
            error={errors["label"] !== undefined}
            helperText={errors["label"]?.message}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={onClose}>
          ปิด
        </Button>
        <Button type="submit">ตกลง</Button>
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

      <CategoryFormDialog
        open={dialog.open && !isBackdrop}
        onClose={dialog.handleClose}
        category={null}
      />
    </>
  );
};

export default AddController;
