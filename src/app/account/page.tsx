import { Stack, Typography } from "@mui/material";
import React from "react";
import DetailForm from "./components/DetailForm";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import AddressForm from "./components/AddressForm";
import LineForm from "./components/LineForm";

const Account = () => {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems={"center"} spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">บัญชี</Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          ></Stack>
        </Stack>
      </Stack>
      <Grid container spacing={1}>
        <Grid xs={12} lg={6}>
          <Stack spacing={1}>
            <DetailForm />
            <LineForm />
          </Stack>
        </Grid>
        <Grid xs={12} lg={6}>
          <Stack spacing={1}>
            <AddressForm />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Account;
