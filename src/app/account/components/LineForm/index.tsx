"use client";
import { NotificationsTwoTone } from "@mui/icons-material";
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

const LineForm = () => {
  return (
    <Card>
      <CardHeader title="ไลน์"></CardHeader>
      <Divider />
      <CardContent component={"form"}>
        <Stack spacing={1}>
          <TextField
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NotificationsTwoTone />
                </InputAdornment>
              ),
            }}
            fullWidth
            placeholder="LINE TOKEN"
            autoFocus
          />
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

export default LineForm;
