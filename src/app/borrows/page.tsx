import { Stack, Typography } from "@mui/material";
import AddForm from "./components/AddForm";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { TasksProgress } from "./components/Stats/components/TasksProgress";
import { CancelTwoTone, CheckTwoTone, TimerTwoTone } from "@mui/icons-material";
import BorrowDatatable from "./components/datatable";

const Borrows = async () => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">การเบิก</Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          ></Stack>
        </Stack>
      </Stack>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <AddForm />
        </Grid>
        <Grid xs={6}>
          <Stack sx={{ height: "100%" }} justifyContent={"space-between"}>
            <TasksProgress
              label="กำลังดำเนินการ"
              value={0}
              color="warning"
              icon={<TimerTwoTone />}
            />
            <TasksProgress
              label="สำเร็จ"
              value={0}
              color="success"
              icon={<CheckTwoTone />}
            />
            <TasksProgress
              label="ยกเลิก"
              value={0}
              color="error"
              icon={<CancelTwoTone />}
            />
          </Stack>
        </Grid>
        <Grid xs={12}>
          <BorrowDatatable />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Borrows;
