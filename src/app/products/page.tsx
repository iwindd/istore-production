import { Stack, Typography } from "@mui/material"
import { Category } from "@prisma/client"
import ProductDatatable from "./components/datatable";
import AddController from "./components/add-controller";
import GetAllCategories from "@/actions/category/all";

const Products = async () => {
  const categories = await GetAllCategories()

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">สินค้า</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}></Stack>
        </Stack>
        <>
          <AddController categories={categories.data} />
        </>
      </Stack>
      <ProductDatatable categories={categories.data}/>
    </Stack>
  )
}

export default Products