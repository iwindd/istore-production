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
  BackHandTwoTone,
  ReceiptLongTwoTone,
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
  borrows: BackHandTwoTone,
  purchase: ReceiptLongTwoTone
} as Record<string, ElementType>;
