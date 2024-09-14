import { CartItem, CartState } from "@/atoms/cart";
import { Product } from "@prisma/client";
import { useRecoilState } from "recoil";

export interface CartProduct extends Product {
  category: {
    overstock : boolean
  } | null
} 

interface CartHook {
  cart: CartItem[];
  clear(): void;
  total(): number;
  addProduct(product: CartProduct): void;
}

export function useCart(): CartHook {
  const [cart, setCart] = useRecoilState(CartState);

  const addProduct = (product: CartProduct) => {
    setCart((prev) => {
      const item = prev.find((i) => i.serial === product.serial);

      if (item) {
        return prev.map((i) =>
          i.serial === product.serial ? { ...i, count: i.count + 1 } : i
        );
      } else {
        if (!product.category?.overstock && product.stock <= 0) throw ("จำนวนสินค้าในสต๊อกไม่ถูกต้อง!");
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
