"use client";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { AddTwoTone, Rotate90DegreesCcw } from "@mui/icons-material";
import { Category, Product } from "@prisma/client";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useDialog } from "@/hooks/use-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useInterface } from "@/providers/InterfaceProvider";
import {
  ProductFindSchema,
  ProductFindValues,
  ProductSchema,
  ProductValues,
} from "@/schema/Product";
import GetProduct from "@/actions/product/find";
import { randomEan } from "@/libs/ean";
import CreateProduct from "@/actions/product/create";
import UpdateProduct from "@/actions/product/update";
import Selector from "@/components/Selector";

interface AddDialogProps {
  onClose: () => void;
  open: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SearchDialogProps extends AddDialogProps {
  onSubmit: (product?: Product) => void;
}

export interface ProductFormDialogProps extends AddDialogProps {
  product: Product | null;
  categories: Category[];
}

function SearchDialog({
  open,
  onClose,
  onSubmit,
  setLoading,
}: SearchDialogProps): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<ProductFindValues>({
    resolver: zodResolver(ProductFindSchema),
  });
  const { enqueueSnackbar } = useSnackbar();

  const searchSubmit: SubmitHandler<ProductFindValues> = async (
    payload: ProductFindValues
  ) => {
    setLoading(true);

    try {
      const resp = await GetProduct(payload.serial, true);
      if (!resp.success) throw Error("not_found");
      onSubmit(resp?.data || ({ serial: payload.serial } as Product));
    } catch (error) {
      enqueueSnackbar("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) reset();
  }, [open, reset])

  const onSelector = (product: Product | null) => {
    if (product && product.serial) searchSubmit({ serial: product.serial });
  }

  const random = () => {
    const randomSerial = randomEan();
    setValue("serial", randomSerial);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(searchSubmit),
      }}
      maxWidth="xs"
      fullWidth
      disableRestoreFocus
    >
      <DialogTitle>ค้นหาสินค้า</DialogTitle>
      <DialogContent>
        <Stack sx={{ mt: 2 }} spacing={1}>
          <Stack direction="row" spacing={1}>
            <TextField
              label="รหัสสินค้า"
              {...register("serial")}
              autoFocus
              placeholder="EAN8 or EAN13"
              error={errors["serial"] != undefined}
              helperText={errors["serial"]?.message}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <Tooltip title="สุ่มรหัสสินค้า *สำหรับสินค้าที่ไม่มี barcode">
              <Button color="primary" variant="contained" onClick={random}>
                <Rotate90DegreesCcw />
              </Button>
            </Tooltip>
          </Stack>
          <Divider>หรือ</Divider>
          <Selector onSubmit={onSelector} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ยกเลิก</Button>
        <Button type="submit"> ค้นหา </Button>
      </DialogActions>
    </Dialog>
  );
}

export function ProductFormDialog({
  open,
  setLoading,
  onClose,
  product,
  categories,
}: ProductFormDialogProps): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProductValues>({
    resolver: zodResolver(ProductSchema),
  });

  const { enqueueSnackbar } = useSnackbar();
  const [defaultCategory, setDefaultCategory] = React.useState<number>(0);
  const queryClient = useQueryClient();

  const submitProduct: SubmitHandler<ProductValues> = async (
    payload: ProductValues
  ) => {
    try {
      const resp = await (!product?.id ? CreateProduct(payload) : UpdateProduct(payload, product.id));
      if (!resp.success) throw Error(resp.message);
      reset();
      await queryClient.refetchQueries({
        queryKey: ["products"],
        type: "active",
      });
      enqueueSnackbar("บันทึกสินค้าเรียบร้อยแล้ว!", { variant: "success" });
      onClose();
    } catch (error) {
      enqueueSnackbar("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue("serial", product?.serial || "");
    setValue("label", product?.label || "");
    setValue("price", product?.price || 0);
    setValue("stock_min", product?.stock_min || 0);
    setValue("cost", product?.cost || 0);
    setValue("keywords", product?.keywords || "");
    setValue("category_id", product?.category_id || 0);
    setDefaultCategory(product?.category_id || 0);
  }, [product, setValue]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(submitProduct),
      }}
      disableRestoreFocus
    >
      <DialogTitle>{product?.label ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}</DialogTitle>
      <DialogContent>
        <Stack sx={{ mt: 2 }} spacing={1}>
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                required
                label="รหัสสินค้า"
                {...register("serial")}
                autoFocus
                disabled
                hidden
              />
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                autoFocus
                required
                label="ชื่อสินค้า"
                error={errors["label"] !== undefined}
                helperText={errors["label"]?.message ?? ""}
                {...register("label")}
              />
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <InputLabel required>
                  {categories.length <= 0
                    ? "ไม่พบประเภทสินค้า"
                    : "ประเภทสินค้า"}
                </InputLabel>
                {categories.length > 0 ? (
                  <Select
                    label="ประเภทสินค้า"
                    defaultValue={defaultCategory}
                    fullWidth
                    required
                    {...register("category_id", { valueAsNumber: true })}
                  >
                    {categories.map((category: Category) => (
                      <MenuItem value={category.id} key={category.id}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                ) : null}
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <TextField
                fullWidth
                required
                label="ราคา"
                error={errors["price"] !== undefined}
                helperText={errors["price"]?.message}
                {...register("price", { valueAsNumber: true })}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                fullWidth
                required
                label="ราคาต้นทุน"
                error={errors["cost"] !== undefined}
                helperText={errors["cost"]?.message}
                {...register("cost", { valueAsNumber: true })}
              />
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                required
                label="สต๊อกขั้นต่ำ"
                error={errors["stock_min"] !== undefined}
                helperText={errors["stock_min"]?.message}
                {...register("stock_min", { valueAsNumber: true })}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="คีย์เวิร์ด"
                error={errors["keywords"] !== undefined}
                helperText={errors["keywords"]?.message}
                {...register("keywords")}
              />
            </Grid>
          </Grid>
          {
            product?.id && product?.deleted != null && (
              <Alert color="error">สินค้านี้ถูกลบไปแล้ว! หากคุณบันทึกสินค้านี้จะถูกกู้คืน {product.label} </Alert>
            )
          }
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ยกเลิก</Button>
        <Button type="submit">{product && product?.deleted ? "กู้คืนและบันทึก" : "บันทึก"}</Button>
      </DialogActions>
    </Dialog>
  );
}

const AddController = ({ categories }: { categories: Category[] }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const { setBackdrop, isBackdrop } = useInterface();
  const { enqueueSnackbar } = useSnackbar();
  const [isSearch, setIsSearch] = useState<boolean>(true);
  const dialogInfo = useDialog();

  const onOpen = () => {
    if (categories.length <= 0) {
      return enqueueSnackbar("ไม่พบประเภทสินค้า", { variant: "error" });
    }

    setIsSearch(true);
    dialogInfo.handleOpen();
  };

  const onClose = () => {
    setProduct(null);
    dialogInfo.handleClose();
  };

  const onSubmit = (foundProduct?: Product) => {
    setProduct(foundProduct ? foundProduct : null);
    setIsSearch(false);
  };

  return (
    <>
      <Button startIcon={<AddTwoTone />} variant="contained" onClick={onOpen}>
        เพิ่มรายการ
      </Button>

      <SearchDialog
        open={dialogInfo.open && !isBackdrop && isSearch}
        onClose={onClose}
        setLoading={setBackdrop}
        onSubmit={onSubmit}
      />
      <ProductFormDialog
        open={dialogInfo.open && !isBackdrop && !isSearch}
        onClose={onClose}
        setLoading={setBackdrop}
        product={product}
        categories={categories}
      />
    </>
  );
};

export default AddController;
