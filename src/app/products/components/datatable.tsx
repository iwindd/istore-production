"use client";
import React, { useState } from "react";
import * as ff from "@/lib/formatter";
import {
  DeleteTwoTone,
  EditTwoTone,
  ViewAgendaTwoTone,
} from "@mui/icons-material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useDialog } from "@/hooks/use-dialog";
import { Confirmation, useConfirm } from "@/hooks/use-confirm";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import GridLinkAction from "@/components/GridLinkAction";
import { Path } from "@/config/Path";
import Datatable from "@/components/Datatable";
import { useInterface } from "@/providers/InterfaceProvider";
import { Product } from "@prisma/client";
import GetProducts from "@/actions/product/get";

const ProductDatatable = () => {
  const editDialog = useDialog();
  const { setBackdrop, isBackdrop } = useInterface();
  const { enqueueSnackbar } = useSnackbar();
  const [product, setProduct] = useState<Product | null>(null);
  const queryClient = useQueryClient();

  const confirmation = useConfirm({
    title: "แจ้งเตือน",
    text: "คุณต้องการที่จะลบสินค้าหรือไม่",
    onConfirm: async (id: number) => {},
  });

  const menu = {
    edit: React.useCallback(
      (product: Product) => () => {},
      [editDialog, setProduct]
    ),
    delete: React.useCallback((product: Product) => () => {}, [confirmation]),
  };

  const columns = (): GridColDef[] => {
    return [
      { field: "serial", sortable: false, headerName: "รหัสสินค้า", flex: 1 },
      { field: "title", sortable: false, headerName: "ชื่อสินค้า", flex: 1 },
      {
        field: "keywords",
        sortable: true,
        headerName: "คีย์เวิร์ด",
        flex: 1,
        valueFormatter: (data: any) => ff.text(data.value),
      },
      {
        field: "category",
        sortable: true,
        headerName: "ประเภทสินค้า",
        flex: 1,
        valueFormatter: (data: any) => data.label,
      },
      {
        field: "price",
        sortable: true,
        headerName: "ราคา",
        flex: 1,
        type: "number",
        valueFormatter: ({ value }) => ff.money(value),
      },
      {
        field: "cost",
        sortable: true,
        headerName: "ต้นทุน",
        flex: 1,
        type: "number",
        valueFormatter: ({ value }) => ff.money(value),
      },
      {
        field: "stock",
        sortable: true,
        headerName: "ของในสต๊อก",
        flex: 1,
        type: "number",
        valueFormatter: (data: any) => ff.number(data.value),
      },
      {
        field: "actions",
        type: "actions",
        headerName: "เครื่องมือ",
        flex: 1,
        getActions: ({ row }: { row: Product }) => [
          <GridActionsCellItem
            key="edit"
            icon={<EditTwoTone />}
            onClick={menu.edit(row)}
            label="แก้ไข"
            showInMenu
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteTwoTone />}
            onClick={menu.delete(row)}
            label="ลบ"
            showInMenu
          />,
        ],
      },
    ];
  };

  return (
    <>
      <Datatable
        name={"products"}
        columns={columns()}
        fetch={GetProducts}
        height={700}
      />

      <Confirmation {...confirmation.props} />
    </>
  );
};

export default ProductDatatable;
