import { Stack, Typography } from "@mui/material";
import StockDatatable from "./components/Datatable";

const Stocks = async () => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems={"center"} spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">จัดการสต๊อก</Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          ></Stack>
        </Stack>
      </Stack>
      <StockDatatable />
    </Stack>
  );
};

export default Stocks;
