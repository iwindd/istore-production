import { Stack, Typography } from "@mui/material"
import { Category } from "@prisma/client"
import ProductDatatable from "./components/datatable";

const Products = async () => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">สินค้า</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}></Stack>
        </Stack>
      </Stack>
      <ProductDatatable />
    </Stack>
  )
}

export default Products