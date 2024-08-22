"use client"
import { Article } from "@mui/icons-material";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  CardHeader,
} from "@mui/material";
import React from "react";

const Report = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: `var(--mui-palette-warning-main)` }}>
            <Article />
          </Avatar>
        }
        action={
          <Breadcrumbs aria-label="breadcrumb">
            <Button>รายงานประจำวัน</Button>
            <Button>รายงานประจำเดือน</Button>
          </Breadcrumbs>
        }
        title="รายงาน"
      />
    </Card>
  );
};

export default Report;
