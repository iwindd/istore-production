"use client";
import Receipt from "@/app/report/receipt";
import { number } from "@/libs/formatter";
import { ReceiptTwoTone } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useParams } from "next/navigation";
import React from "react";

const ReceiptController = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <PDFDownloadLink
      document={<Receipt />}
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
