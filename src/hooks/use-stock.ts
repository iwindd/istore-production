import CommitAction from "@/actions/stock/commit";
import { StockItem, StockState } from "@/atoms/stock";
import { Product } from "@prisma/client";
import { SetterOrUpdater, useRecoilState } from "recoil";

interface StockHook {
  stocks: StockItem[];
  addProduct(product: Product, amount: number): void;
  commit(instant?: boolean, note?: string): Promise<boolean>;
  setStocks: SetterOrUpdater<StockItem[]>;
}

export function useStock(): StockHook {
  const [stocks, setStocks] = useRecoilState(StockState);

  const addProduct = (product: Product, amount: number) => {
    setStocks((prev) => {
      const getProducts = () => {
        const oldData = stocks.find(
          (product_) => product_.serial == product.serial
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
      };

      return getProducts().filter((product) => product.payload != 0);
    });
  };

  const commit = async (instant?: boolean, note?: string) => {
    try {
      if (stocks.length <= 0) throw Error("no_items");
      const resp = await CommitAction(stocks, instant, note);
      if (!resp.success) throw Error(resp.message);
      setStocks([]);
      return true;
    } catch (error) {
      return false;
    }
  };

  return { stocks, addProduct, commit, setStocks };
}
