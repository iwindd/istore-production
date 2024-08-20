import { StockItem, StockState } from "@/atoms/stock";
import { useRecoilState } from "recoil";

interface StockHook {
  stocks: StockItem[];
}

export function useStock(): StockHook {
  const [stocks, setStocks] = useRecoilState(StockState);

  return { stocks };
}
