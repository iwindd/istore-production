import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export interface TasksProgressProps {
  sx?: SxProps;
  value: number;
  label: string;
  color:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";
  icon: React.ReactNode;
}

export function TasksProgress(props: TasksProgressProps): React.JSX.Element {
  let value = props.value;
  if (isNaN(value)) value = 0;

  return (
    <Card sx={props.sx}>
      <CardContent>
        <Stack flexDirection={"row"}>
          <Avatar
            sx={{
              backgroundColor: `var(--mui-palette-${props.color}-main)`,
              height: "56px",
              width: "56px",
            }}
          >
            {props.icon}
          </Avatar>
          <Stack flexGrow={1} pl={1} spacing={1}>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Typography color="text.secondary" variant="h6">
                {" "}
                {props.label}{" "}
              </Typography>
              <Typography variant="h4">{value.toFixed(0)}%</Typography>
            </Stack>
            <div>
              <LinearProgress
                value={value}
                color={props.color}
                variant="determinate"
              />
            </div>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
