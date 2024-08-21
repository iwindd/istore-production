import { Stack, Typography } from "@mui/material"
import AddController from "./components/add-controller"

const Purchase = async () => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">ซื้อสินค้า</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}></Stack>
        </Stack>
        <>
          <AddController />
        </>
      </Stack>
    </Stack>
  )
}

export default Purchase