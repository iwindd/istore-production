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

const CategoryDatatable = () => {
  const menu = {
    edit: React.useCallback(
      (category: Category) => () => {
        console.log("on edit");
      },
      []
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
          <GridLinkAction
            key="view"
            to={`${Path("categories").href}/${row.id}`}
            icon={<ViewAgendaTwoTone />}
            label="ดูรายละเอียด"
            showInMenu
          />,
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
    </>
  );
};

export default CategoryDatatable;
