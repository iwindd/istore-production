import { Stack, Typography } from "@mui/material";
import StockDatatable from "./components/Datatable";
import AddController from "./components/add-controller";

const Stocks = async () => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems={"center"} spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">จัดการสต๊อก</Typography>
        </Stack>
        <>
          <AddController/>
        </>
      </Stack>
      <StockDatatable />
    </Stack>
  );
};

export default Stocks;
