"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useDialog } from "@/hooks/use-dialog";
import { PanToolAlt } from "@mui/icons-material";
import { ImportPayload, Imports, ImportType } from "../../import";
import MinStockController from "./components/MinStockController";
import { useInterface } from "@/providers/InterfaceProvider";
import ImportToolAction from "@/actions/stock/tool";
import { useStock } from "@/hooks/use-stock";
import { enqueueSnackbar } from "notistack";

interface SelecterDialogProps {
  onClose: () => void;
  open: boolean;
}

const SelecterDialog = ({
  open,
  onClose,
}: SelecterDialogProps): React.JSX.Element => {
  const [type, setType] = React.useState<ImportType>(ImportType.FromMinStock);
  const [payload, setPayload] = React.useState<ImportPayload | null>(null);
  const [changedBy, setChangedBy] = React.useState<string>("10");
  const { isBackdrop, setBackdrop } = useInterface();
  const { setStocks } = useStock();

  const handleChange = (event: SelectChangeEvent) => {
    setType(+event.target.value);
    setPayload(null);
  };

  const onSubmit = async () => {
    if (!payload) return;
    if (+(changedBy || 0) <= 0) return;
    setBackdrop(true);

    try {
      const resp = await ImportToolAction(payload);
      if (!resp.success) throw Error(resp.message);
      
      setStocks(resp.data.map((p) => ({...p, payload: +changedBy})));
      enqueueSnackbar("เพิ่มสินค้าสำเร็จ!", {variant: "success"});
      onClose();
    } catch (error) {
      enqueueSnackbar("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง", {
        variant: "error",
      });
    } finally {
      setBackdrop(false);
    }
  };

  return (
    <Dialog
      open={open && !isBackdrop}
      maxWidth="xs"
      onClose={onClose}
      fullWidth
      disableRestoreFocus
    >
      <DialogTitle>เครื่องมือ</DialogTitle>
      <DialogContent>
        <Stack sx={{ mt: 2 }} spacing={1}>
          <Stack flexDirection={"column"} spacing={2}>
            <FormControl>
              <InputLabel id="selector-label">ประเภทการนำเข้า</InputLabel>
              <Select
                labelId="selector-label"
                value={String(type)}
                label="ประเภทการนำเข้า"
                onChange={handleChange}
              >
                {Imports.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <TextField
            type="number"
            value={changedBy}
            onChange={(e) => setChangedBy(e.target.value)}
            fullWidth
            label="เปลี่ยนแปลงโดย"
          />
          <Divider />
          {type == ImportType.FromMinStock && (
            <MinStockController payload={payload} setPayload={setPayload} />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack sx={{ width: "100%" }} direction={"row"} justifyContent={"end"}>
          <Button onClick={onClose}>ปิด</Button>
          <Button onClick={onSubmit}>ยืนยัน</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

const ToolController = () => {
  const dialogInfo = useDialog();

  const onOpen = () => {
    dialogInfo.handleOpen();
  };

  const onClose = () => {
    dialogInfo.handleClose();
  };

  return (
    <>
      <Button startIcon={<PanToolAlt />} variant="text" onClick={onOpen}>
        เครื่องมือ
      </Button>

      <SelecterDialog open={dialogInfo.open} onClose={onClose} />
    </>
  );
};

export default ToolController;
