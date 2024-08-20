"use client";
import React from "react";
import * as ff from "@/lib/formatter";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  gridClasses,
} from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import thTHGrid from "@/components/locale/datatable";
import { useStock } from "@/hooks/use-stock";

const StockDatatable = () => {
  const { stocks } = useStock();

  const columns = (): GridColDef[] => {
    return [
      { field: "serial", flex: 1, sortable: true, headerName: "#" },
      { field: "title", flex: 1, sortable: true, headerName: "ชื่อสินค้า" },
      {
        field: "stock",
        flex: 1,
        sortable: true,
        headerName: "คงเหลือ",
        valueFormatter: (data: any) => ff.number(data.value),
      },
      {
        field: "payload",
        flex: 1,
        sortable: true,
        headerName: "เปลี่ยนแปลง",
        valueFormatter: (data: any) =>
          `${data.value > 0 ? "+" : "-"} ${ff.absNumber(data.value) as string}`,
      },
      {
        field: "all",
        flex: 1,
        sortable: true,
        editable: true,
        headerName: "รวม",
        valueFormatter: (data: any) => ff.number(data.value),
      },
    ];
  };

  const onUpdate = async (newData: any, oldData: any) => {
    // TODO :: UPDATE STOCK STATE

    return newData;
  };

  return (
    <Paper sx={{ height: 700 }}>
      <DataGrid
        localeText={thTHGrid}
        columns={columns()}
        rows={stocks}
        processRowUpdate={onUpdate}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            csvOptions: {
              utf8WithBom: true,
            },
            printOptions: {
              disableToolbarButton: true,
            },
          },
        }}
        sx={{
          "& .MuiDataGrid-row:last-child": {
            "& .MuiDataGrid-cell": {
              borderBottomWidth: 0,
            },
          },
          "& .MuiDataGrid-colCell": {
            backgroundColor: "var(--mui-palette-background-level1)",
            color: "var(--mui-palette-text-secondary)",
            lineHeight: 1,
          },
          "& .MuiDataGrid-checkboxInput": {
            padding: "0 0 0 24px",
          },
          [`& .${gridClasses.columnHeader}`]: {
            backgroundColor: "var(--mui-palette-background-level1)",
            color: "var(--mui-palette-text-secondary)",
          },
          [`& .text-color-primary`]: {
            color: "var(--mui-palette-primary-main)",
          },
          [`& .text-color-secondary`]: {
            color: "var(--mui-palette-secondary-dark)",
          },
          [`& .text-color-info`]: { color: "var(--mui-palette-info-main)" },
          [`& .text-color-warning`]: {
            color: "var(--mui-palette-warning-main)",
          },
          [`& .text-color-success`]: {
            color: "var(--mui-palette-success-main)",
          },
          [`& .text-color-error`]: { color: "var(--mui-palette-error-main)" },
        }}
      />
    </Paper>
  );
};

export default StockDatatable;
