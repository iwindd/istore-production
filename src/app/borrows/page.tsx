"use server";
import { Stack, Typography } from "@mui/material";
import AddForm from "./components/AddForm";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { TasksProgress } from "./components/Stats/components/TasksProgress";
import { CancelTwoTone, CheckTwoTone, TimerTwoTone } from "@mui/icons-material";
import BorrowDatatable from "./components/datatable";
import GetBorrowStats from "@/actions/borrow/stats";

const Borrows = async () => {
  const data = { progress: 0, success: 0, cancel: 0, all: 0 };

  try {
    const resp = await GetBorrowStats();
    if (resp.success) {
      const stats = resp.data;
      const all = stats.length;
  
      data.progress =
        (stats.filter((i) => i.status == "PROGRESS").length / all) * 100;
      data.success =
        (stats.filter((i) => i.status == "SUCCESS").length / all) * 100;
      data.cancel =
        (stats.filter((i) => i.status == "CANCEL").length / all) * 100;
    };
  } catch (error) {
  }

  return (
    <Stack spacing={1}>
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
      <Grid container spacing={1}>
        <Grid xs={6}>
          <AddForm />
        </Grid>
        <Grid xs={6}>
          <Stack sx={{ height: "100%" }} spacing={1}>
            <Typography variant="caption" sx={{mb: 'auto'}}>* การเบิกคือการหยิบยืมสินค้าเพื่อไปขายข้างนอกร้านค้าโดยจะทำการซิงค์ข้อมูลกับสต๊อก</Typography>
            <TasksProgress
              label="กำลังดำเนินการ"
              value={data.progress}
              color="warning"
              icon={<TimerTwoTone />}
            />
            <TasksProgress
              label="สำเร็จ"
              value={data.success}
              color="success"
              icon={<CheckTwoTone />}
            />
            <TasksProgress
              label="ยกเลิก"
              value={data.cancel}
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
