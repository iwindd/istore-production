"use server";
import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { notFound } from "next/navigation";
import React from "react";
import { HistoryProductTable } from "./components/table/table-product";
import { NoteCard } from "./components/card/NoteCard";
import * as ff from "@/lib/formatter";
import { PriceCard } from "./components/card/PriceCard";
import { CostCard } from "./components/card/CostCard";
import { ProfitCard } from "./components/card/ProfitCard";
import GetHistory from "@/actions/order/find";

const History = async ({ params }: { params: { id: string } }) => {
  const history = await GetHistory(Number(params.id));

  if (!history.success) throw new Error("ERROR");
  if (!history.data) return notFound();

  const data = history.data;

  return (
    <Grid container spacing={3}>
      <Grid lg={12} md={12} xs={12}>
        <Stack direction="row" spacing={3} alignItems={"center"}>
          <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
            <Typography variant="h4">ประวัติการทำรายการ</Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <NoteCard sx={{ height: "100%" }} value={ff.text(data.note)} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <PriceCard
          sx={{ height: "100%" }}
          value={ff.money(data.price) as string}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <CostCard
          sx={{ height: "100%" }}
          value={ff.money(data.cost) as string}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <ProfitCard
          sx={{ height: "100%" }}
          value={ff.money(data.profit) as string}
        />
      </Grid>
      <Grid xs={12}>
        <HistoryProductTable products={data.products} />
      </Grid>
    </Grid>
  );
};

export default History;
