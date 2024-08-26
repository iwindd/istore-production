import { Stack, Typography } from "@mui/material"
import OverstockDatatable from "./components/datatable";

const Categories = async () => {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">สินค้าค้าง</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}></Stack>
        </Stack>
      </Stack>
      <OverstockDatatable />
    </Stack>
  )
}

export default Categories