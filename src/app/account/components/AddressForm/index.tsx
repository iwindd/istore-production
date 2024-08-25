"use client";
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

const AddressForm = () => {
  return (
    <Card>
      <CardHeader title="ที่อยู่"></CardHeader>
      <Divider />
      <CardContent component={"form"}>
        <Stack spacing={1}>
          <TextField
            label="ที่อยู่"
            placeholder="บ้านเลขที่/หมู่ที่/ซอย/ถนน"
            fullWidth
            autoFocus
          />
          <TextField label="ตำบล" fullWidth autoFocus />
          <TextField label="อำเภอ" fullWidth autoFocus />
          <TextField label="จังหวัด" fullWidth autoFocus />
          <TextField label="รหัสไปรษณีย์" fullWidth autoFocus />
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="inherit"
          variant="text"
          sx={{ ml: "auto" }}
        >
          บันทึก
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddressForm;
