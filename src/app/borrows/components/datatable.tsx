"use client";
import React from "react";
import Datatable from "@/components/Datatable";
import { CancelTwoTone, EditTwoTone } from "@mui/icons-material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Borrows } from "@prisma/client";
import GetBorrows from "@/actions/borrow/get";

const BorrowDatatable = () => {
  const menu = {
    edit: React.useCallback(() => () => {}, []),
    delete: React.useCallback(() => () => {}, []),
  };

  const columns = (): GridColDef[] => {
    return [
      {
        field: "label",
        sortable: true,
        headerName: "วันที่เบิก",
        flex: 3,
        editable: true,
      },
      {
        field: "label",
        sortable: true,
        headerName: "จำนวนคงเหลือ",
        flex: 3,
        editable: true,
      },
      {
        field: "status",
        sortable: true,
        headerName: "สถานะ",
        flex: 3,
        editable: true,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "เครื่องมือ",
        flex: 1,
        getActions: ({ row }: { row: Borrows }) => [
          <GridActionsCellItem
            key="edit"
            icon={<EditTwoTone />}
            onClick={menu.edit()}
            label="อัพเดท"
            showInMenu
          />,
          <GridActionsCellItem
            key="cancel"
            icon={<CancelTwoTone />}
            onClick={menu.delete()}
            label="ยกเลิก"
            showInMenu
          />,
        ],
      },
    ];
  };

  return (
    <>
      <Datatable
        name={"borrows"}
        columns={columns()}
        fetch={GetBorrows}
        height={700}
      />
    </>
  );
};

export default BorrowDatatable;
