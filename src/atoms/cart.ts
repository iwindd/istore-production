"use client";
import { atom } from "recoil";
import { PersistStorage, recoilPersist } from 'recoil-persist'

export interface CartItem {
  id: number,
  serial: string,
  label: string,
  price: number,
  count: number,
  stock: number,
}

const localStorage = typeof window !== `undefined` ? window.localStorage : null

const { persistAtom } = recoilPersist({
  key: 'cart-persist',
  storage: localStorage as PersistStorage
})

export const CartState = atom<CartItem[]>({
  key: 'cart', 
  default: [],
  effects: [persistAtom]
});