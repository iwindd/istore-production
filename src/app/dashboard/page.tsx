import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { Traffic } from "./charts/traffic";
import { Sales } from "./charts/sales";
import { getServerSession } from "@/libs/session";
import getOrders from "@/actions/dashboard/getOrders";
import dayjs from "@/libs/dayjs";
import { TotalStat } from "./stats/Stat";
import { AttachMoney, BackHand, Receipt, ShoppingBasket } from "@mui/icons-material";
import { money, number, order } from "@/libs/formatter";
import getBorrows from "@/actions/dashboard/getBorrows";
import Range from "./range";
import { getRange } from "@/actions/dashboard/range";
import { Path } from "@/config/Path";

const Dashboard = async () => {
  const [startDate, endDate] = await getRange()
  const session = await getServerSession();
  if (!session) return;
  const storeId = Number(session.user.store);
  const orders = await getOrders(storeId);  
  const borrows = await getBorrows(storeId);
  const totalProfit = orders.reduce((total, item) => total + item.profit, 0);

  // traffic
  const cashoutOrders = orders.filter((order) => order.type == "CASHOUT");
  const trafficToPercent = (length: number) =>
    (length / cashoutOrders.length) * 100;
  const trafficStats = [
    +trafficToPercent(
      cashoutOrders.filter((order) => order.method == "CASH").length
    ).toFixed(0),
    +trafficToPercent(
      cashoutOrders.filter((order) => order.method == "BANK").length
    ).toFixed(0),
  ];

  //data
  const weekSolds = [0, 0, 0, 0, 0, 0, 0];
  orders.map((order) => weekSolds[dayjs(order.created_at).day()]++);

  return (
    <Grid container spacing={1}>
      <Grid xs={12}><Range savedStart={startDate ? startDate.format() : null} savedEnd={endDate ? endDate.format() : null} /></Grid>
      <Grid lg={3} sm={6} xs={12}><TotalStat href={Path("histories").href} label="ออเดอร์" color="primary" icon={<Receipt/>} value={`${number(orders.length)} รายการ`} /></Grid>
      <Grid lg={3} sm={6} xs={12}><TotalStat label="เงินในระบบ" color="success" icon={<AttachMoney/>} value={`${money(totalProfit)}`} /></Grid>
      <Grid lg={3} sm={6} xs={12}><TotalStat href={Path("borrows").href} label="การเบิก" color="warning" icon={<BackHand/>} value={`${number(borrows.length)} รายการ`} /></Grid>
      <Grid lg={3} sm={6} xs={12}><TotalStat href={Path("purchase").href} label="การซื้อ" color="info" icon={<ShoppingBasket/>} value={`${number(orders.filter(b => b.type == "PURCHASE").length)} รายการ`} /></Grid>
      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: "ยอดขาย", data: weekSolds },
          ]}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic
          chartSeries={trafficStats}
          labels={["เงินสด", "ธนาคาร"]}
          sx={{ height: "100%" }}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
