"use client";
import { AddTwoTone } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";

const AddForm = () => {
  return (
    <Card>
      <CardHeader title="เพิ่มรายการเบิก" />
      <Divider />
      <CardContent>
        <Stack component={"form"} spacing={1}>
          <TextField label="รหัสสินค้า" />
          <TextField label="จำนวน" />
          <TextField label="หมายเหตุ" />
        </Stack>
      </CardContent>
      <Divider />
      <CardActions disableSpacing>
        <Button startIcon={<AddTwoTone />} sx={{ ml: "auto" }}>
          เพิ่ม
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddForm;
