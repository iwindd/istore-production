"use client";
import { AnalyticsTwoTone } from "@mui/icons-material";
import { Button, Card, CardHeader, Stack, Tooltip } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { RangeChange } from "@/actions/dashboard/range";

const Range = ({ savedStart, savedEnd }: {
  savedStart: string | null,
  savedEnd: string | null
}) => {
  const [start, setStart] = React.useState<Dayjs | null>(savedStart ? dayjs(savedStart) : null);
  const [end, setEnd] = React.useState<Dayjs | null>(savedEnd ? dayjs(savedStart) : null);

  useEffect(() => {
    if (savedStart ) setStart(dayjs(savedStart));
    if (savedEnd ) setEnd(dayjs(savedEnd));
  }, [savedStart, savedEnd, setStart, setEnd])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await RangeChange(start?.format(), end?.format());
    } catch (error) {
      setStart(dayjs().subtract(1, "month"));
      setStart(dayjs());
      enqueueSnackbar("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง", {
        variant: "error",
      });
    }
  };

  return (
    <Card>
      <CardHeader
        title="ภาพรวม"
        action={
          <Stack
            onSubmit={onSubmit}
            component={"form"}
            direction={"row"}
            spacing={1}
          >
            <DatePicker
              value={start}
              name="start"
              format="DD/MM/YYYY"
              onChange={(data) => setStart(data)}
              label="วันเริมต้น"
              disableFuture
            />
            <DatePicker
              value={end}
              name="end"
              format="DD/MM/YYYY"
              onChange={(data) => setEnd(data)}
              label="สิ้นสุด"
              disableFuture
            />
            <Tooltip title="สรุปผล">
              <Button type="submit" variant="contained">
                <AnalyticsTwoTone />
              </Button>
            </Tooltip>
          </Stack>
        }
      />
    </Card>
  );
};

export default Range;
