"use client";
import React from "react";
import Datatable from "@/components/Datatable";
import {
  DeleteTwoTone,
  EditTwoTone,
  ViewAgendaTwoTone,
} from "@mui/icons-material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import GridLinkAction from "@/components/GridLinkAction";
import { Category } from "@prisma/client";
import { Path } from "@/config/Path";
import GetCategories from "@/actions/category/get";
import { CategoryFormDialog } from "./add-controller";
import { useDialog } from "@/hooks/use-dialog";

const CategoryDatatable = () => {
  const editDialog = useDialog();
  const [category, setCategory] = React.useState<Category | null>(null);

  const menu = {
    edit: React.useCallback(
      (category: Category) => () => {
        setCategory(category);
        editDialog.handleOpen();
      },
      [setCategory, editDialog]
    ),
    delete: React.useCallback(
      (category: Category) => () => {
        console.log("on delete");
      },
      []
    ),
  };

  const columns = (): GridColDef[] => {
    return [
      {
        field: "label",
        sortable: true,
        headerName: "ประเภทสินค้า",
        flex: 3,
        editable: true,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "เครื่องมือ",
        flex: 1,
        getActions: ({ row }: { row: Category }) => [
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
        name={"categories"}
        columns={columns()}
        fetch={GetCategories}
        height={700}
      />

      <CategoryFormDialog open={editDialog.open} onClose={editDialog.handleClose} category={category} />
    </>
  );
};

export default CategoryDatatable;
