import {
  Store,
  ShoppingCart,
  Work,
  BackHand,
  ReceiptLong,
  Category,
  History,
  AllInbox,
  Badge,
  Person,
  Business,
} from "@mui/icons-material";
import { ElementType } from "react";

export default {
  "chart-pie": Store,
  business: Business,
  person: Person,
  badge: Badge,
  product: Work,
  stock: AllInbox,
  history: History,
  store: Store,
  category: Category,
  cashier: ShoppingCart,
  borrows: BackHand,
  purchase: ReceiptLong
} as Record<string, ElementType>;
