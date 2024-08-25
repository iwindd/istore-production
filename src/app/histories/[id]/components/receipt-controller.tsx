"use client";
import Receipt, { ReceiptProps } from "@/app/report/receipt";
import { number } from "@/libs/formatter";
import { ReceiptTwoTone } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import { OrderProduct } from "@prisma/client";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useParams } from "next/navigation";
import React from "react";

interface ReceiptControllerProps extends ReceiptProps{}

const ReceiptController = (props: ReceiptControllerProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <PDFDownloadLink
      document={<Receipt {...props} />}
      fileName={`ใบเสร็จบิลที่ #${number(+id)}`}
    >
      {({ loading }) =>
        loading ? (
          <Box
            sx={{
              width: "100px",
            }}
          >
            <LinearProgress />
          </Box>
        ) : (
          <Button startIcon={<ReceiptTwoTone />}>ใบเสร็จ</Button>
        )
      }
    </PDFDownloadLink>
  );
};

export default ReceiptController;
