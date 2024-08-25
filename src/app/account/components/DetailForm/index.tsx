"use client";
import { EmailTwoTone, PeopleTwoTone } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const DetailForm = () => {
  return (
    <Card>
      <CardHeader title="ข้อมูลผู้ใช้"></CardHeader>
      <Divider />
      <CardContent component={"form"}>
        <Stack spacing={1}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PeopleTwoTone />
                </InputAdornment>
              ),
            }}
            fullWidth
            placeholder="ชื่อ"
            autoFocus
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailTwoTone />
                </InputAdornment>
              ),
            }}
            fullWidth
            placeholder="อีเมล"
          />
          <Typography
            variant="caption"
            color="primary"
            sx={{ cursor: "pointer" }}
          >
            เปลี่ยนรหัสผ่าน ?
          </Typography>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="inherit" variant="text" sx={{ ml: "auto" }}>
          บันทึก
        </Button>
      </CardActions>
    </Card>
  );
};

export default DetailForm;
