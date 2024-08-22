import { Article } from "@mui/icons-material";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  Paper,
} from "@mui/material";
import { red } from "@mui/material/colors";
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
