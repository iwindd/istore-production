import { CartItem, CartState } from "@/atoms/cart";
import { Product } from "@prisma/client";
import * as React from "react";
import { useRecoilState } from "recoil";

interface CartHook {
  cart: CartItem[];
  clear(): void;
  total(): number;
  addProduct(product: Product): void;
}

export function useCart(): CartHook {
  const [cart, setCart] = useRecoilState(CartState);

  const addProduct = (product: Product) => {
    setCart((prev) => {
      const item = prev.find((i) => i.serial === product.serial);

      if (item) {
        return prev.map((i) =>
          i.serial === product.serial ? { ...i, count: i.count + 1 } : i
        );
      } else {
        return [
          {
            ...product,
            count: 1,
          },
          ...prev,
        ];
      }
    });
  };

  const clear = () => {
    setCart([]);
  };

  const total = () : number => {
    return cart.reduce((total, item) => total + item.price * item.count, 0)
  }

  return { cart, clear, total, addProduct };
}
