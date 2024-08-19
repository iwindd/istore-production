import { Stack, Typography } from "@mui/material"
import CategoryDatatable from './components/datatable';

const Categories = async () => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">ประเภทสินค้า</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}></Stack>
        </Stack>
      </Stack>
      <CategoryDatatable />
    </Stack>
  )
}

export default Categories