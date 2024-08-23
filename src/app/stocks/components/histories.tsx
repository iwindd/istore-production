"use client";
import React from "react";
import * as ff from "@/libs/formatter";
import {
  CancelTwoTone,
  RecyclingTwoTone,
  UploadTwoTone,
} from "@mui/icons-material";
import { Stock } from "@prisma/client";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Datatable from "@/components/Datatable";
import GetStocks from "@/actions/stock/get";

const formatCellColor = (status: Stock["state"]) => {
  switch (status) {
    case "PROGRESS":
      return "warning";
    case "SUCCESS":
      return "success";
    case "CANCEL":
      return "secondary";
    default:
      return "secondary";
  }
};

const HistoryDatatable = () => {
  const menu = {
    import: React.useCallback((row: Stock) => () => {}, []),
    cancel: React.useCallback((row: Stock) => () => {}, []),
    copy: React.useCallback((row: Stock) => () => {}, []),
  };

  const columns = (): GridColDef[] => {
    return [
      {
        field: "id",
        sortable: true,
        headerName: "#หมายเลขสต๊อก",
        flex: 1,
        editable: false,
        renderCell: (data: any) => `#${ff.number(data.value)}`,
      },
      {
        field: "action_at",
        sortable: true,
        headerName: "วันที่ทำรายการ",
        flex: 2,
        editable: false,
        renderCell: (data: any) => ff.date(data.value),
      },
      {
        field: "_count",
        sortable: false,
        headerName: "จำนวนสินค้า",
        flex: 2,
        editable: false,
        renderCell: ({ value }) => `${ff.number(value.items)} รายการ`,
      },
      {
        field: "note",
        sortable: true,
        headerName: "หมายเหตุ",
        flex: 3,
        editable: false,
        renderCell: (data: any) => ff.text(data.value),
      },
      {
        field: "state",
        sortable: true,
        headerName: "สถานะ",
        flex: 2,
        editable: false,
        renderCell: (data: any) => ff.stockState(data.value),
      },
      {
        field: "actions",
        type: "actions",
        headerName: "เครื่องมือ",
        flex: 1,
        getActions: ({ row }: { row: Stock }) => [
          ...(row.state == "PROGRESS"
            ? [
                <GridActionsCellItem
                  key="import"
                  icon={<UploadTwoTone />}
                  onClick={menu.import(row)}
                  label="นำเข้า"
                  showInMenu
                />,
                <GridActionsCellItem
                  key="cancel"
                  icon={<CancelTwoTone />}
                  onClick={menu.cancel(row)}
                  label="ยกเลิก"
                  showInMenu
                />,
              ]
            : [
                <GridActionsCellItem
                  key="copy"
                  icon={<RecyclingTwoTone />}
                  onClick={menu.copy(row)}
                  label="สร้างรายการอีกครั้ง"
                  showInMenu
                />,
              ]),
        ],
      },
    ];
  };

  return (
    <>
      <Datatable
        name={"stocks_histories"}
        columns={columns()}
        fetch={GetStocks}
        height={700}
        getCellClassName={(params) =>
          params.field == "state"
            ? `text-color-${formatCellColor(params.value as Stock["state"])}`
            : ""
        }
      />
    </>
  );
};

export default HistoryDatatable;
