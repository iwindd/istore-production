import {
  CategoryTwoTone,
  ChatTwoTone,
  HistoryTwoTone,
  ListTwoTone,
  ShoppingBagTwoTone,
  StoreTwoTone,
  AllInboxTwoTone,
  BusinessTwoTone,
  PersonTwoTone,
  BadgeTwoTone,
} from "@mui/icons-material";
import { ElementType } from "react";

export default {
  "chart-pie": ChatTwoTone,
  business: BusinessTwoTone,
  person: PersonTwoTone,
  badge: BadgeTwoTone,
  product: ListTwoTone,
  stock: AllInboxTwoTone,
  history: HistoryTwoTone,
  store: StoreTwoTone,
  category: CategoryTwoTone,
  cashier: ShoppingBagTwoTone,
} as Record<string, ElementType>;
