"use client";
import React from "react";
import Datatable from "@/components/Datatable";
import { CancelTwoTone, EditTwoTone } from "@mui/icons-material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Borrows } from "@prisma/client";
import GetBorrows from "@/actions/borrow/get";
import { enqueueSnackbar } from "notistack";
import { Confirmation, useConfirm } from "@/hooks/use-confirm";
import { useQueryClient } from "@tanstack/react-query";
import PatchBorrow from "@/actions/borrow/patch";

const BorrowDatatable = () => {
  const queryClient = useQueryClient();

  const confirmation = useConfirm({
    title: "แจ้งเตือน",
    text: "คุณต้องการจะยกเลิกรายการเบิกหรือไม่?",
    onConfirm: async (id: number) => {
      try {
        const resp = await PatchBorrow(id, "CANCEL");

        if (!resp.success) throw Error(resp.message);
        enqueueSnackbar("ยกเลิกรายการเบิกสำเร็จแล้ว!", { variant: "success" });
        await queryClient.refetchQueries({
          queryKey: ["borrows"],
          type: "active",
        });
      } catch (error) {
        enqueueSnackbar("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง");
      }
    },
  });

  const menu = {
    edit: React.useCallback(() => () => {}, []),
    cancel: React.useCallback((row : Borrows) => () => {
      confirmation.with(row.id);
      confirmation.handleOpen();
    }, [confirmation]),
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
            onClick={menu.cancel(row)}
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

      <Confirmation {...confirmation.props}/>
    </>
  );
};

export default BorrowDatatable;
