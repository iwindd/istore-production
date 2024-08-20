import CommitAction from "@/actions/stock/commit";
import { StockItem, StockState } from "@/atoms/stock";
import { Product } from "@prisma/client";
import { useRecoilState } from "recoil";

interface StockHook {
  stocks: StockItem[];
  addProduct(product: Product, amount: number): void;
  commit(): Promise<boolean>;
}

export function useStock(): StockHook {
  const [stocks, setStocks] = useRecoilState(StockState);

  const addProduct = (product: Product, amount: number) => {
    setStocks((prev) => {
      const oldData = stocks.find(
        (product) => product.serial == product.serial
      );

      if (oldData) {
        return prev.map((i) =>
          i.serial === product.serial ? { ...i, payload: amount } : i
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            serial: product.serial,
            label: product.label,
            stock: product.stock,
            payload: amount,
          },
        ];
      }
    });
  };

  const commit = async () => {
    try {
      if (stocks.length <= 0) throw Error("no_items");
      const resp = await CommitAction(stocks);
      if (!resp.success) throw Error(resp.message);
      setStocks([]);
      return true;
    } catch (error) {
      return false;
    }
  };

  return { stocks, addProduct, commit };
}
