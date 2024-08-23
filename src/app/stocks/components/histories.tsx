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
import { Confirmation, useConfirm } from "@/hooks/use-confirm";
import { enqueueSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import CancelStock from "@/actions/stock/cancel";
import { useStock } from "@/hooks/use-stock";
import ImportToolAction from "@/actions/stock/tool";
import { ImportFromStockId, ImportType } from "../import";

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
  const { setStocks } = useStock();
  const queryClient = useQueryClient();
  const cancelConfirmation = useConfirm({
    title: "แจ้งเตือน",
    text: "คุณต้องการที่จะยกเลิกรายการสต๊อกหรือไม่?",
    onConfirm: async (id: number) => {
      try {
        const resp = await CancelStock(id);

        if (!resp.success) throw Error(resp.message);
        enqueueSnackbar(`ยกเลิกรายการสต๊อกหมายเลข #${ff.number(id)} แล้ว!`, {
          variant: "success",
        });
        await queryClient.refetchQueries({
          queryKey: ["stocks_histories"],
          type: "active",
        });
      } catch (error) {
        enqueueSnackbar("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง", {
          variant: "error",
        });
      }
    },
  });

  const copyConfirmation = useConfirm({
    title: "แจ้งเตือน",
    text: "คุณต้องการสร้างรายการนี้อีกครั้งหรือไม่?",
    onConfirm: async (id: number) => {
      try {
        const payload: ImportFromStockId = {
          type: ImportType.FromStockId,
          id: id,
        };
        const resp = await ImportToolAction(payload);
        if (!resp.success) throw Error(resp.message);
        setStocks(resp.data);
        enqueueSnackbar(`สร้างรายการสต๊อกหมายเลข #${ff.number(id)} แล้ว!`, {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง", {
          variant: "error",
        });
      }
    },
  });

  const menu = {
    import: React.useCallback((row: Stock) => () => {}, []),
    cancel: React.useCallback(
      (row: Stock) => () => {
        cancelConfirmation.with(row.id);
        cancelConfirmation.handleOpen();
      },
      [cancelConfirmation]
    ),
    copy: React.useCallback((row: Stock) => () => {
      copyConfirmation.with(row.id);
      copyConfirmation.handleOpen();
    }, [copyConfirmation]),
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

      <Confirmation {...cancelConfirmation.props} />
      <Confirmation {...copyConfirmation.props} />
    </>
  );
};

export default HistoryDatatable;
