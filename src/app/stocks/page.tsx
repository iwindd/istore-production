import {Paper, Stack, Typography } from "@mui/material";
import AddController from "./components/add-controller";
import StockDatatable from "./components/datatable";
import ToolController from "./components/tool-controller";
import CommitController from "./components/commit-controller";

const Stocks = () => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems={"center"} spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">สต๊อก</Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          ></Stack>
        </Stack>
        <>
          <ToolController />
          <AddController />
        </>
      </Stack>
      <StockDatatable />
      <Paper sx={{ py: 1 }}>
        <Stack direction={"row"} justifyContent={"end"}>
          <CommitController />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Stocks;
