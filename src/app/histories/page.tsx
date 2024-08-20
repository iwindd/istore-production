import { Stack, Typography } from "@mui/material"
import HistoryDatatable from "./components/datatable"

const HistoryPage = async () => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">ประวัติการซื้อขายสินค้า</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}></Stack>
        </Stack>
      </Stack>
      <HistoryDatatable/>
    </Stack>
  )
}

export default HistoryPage