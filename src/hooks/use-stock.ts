import { StockItem, StockState } from "@/atoms/stock";
import { Product } from "@prisma/client";
import { useRecoilState } from "recoil";

interface StockHook {
  stocks: StockItem[];
  addProduct(product: Product, amount: number): void;
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

  return { stocks, addProduct };
}
