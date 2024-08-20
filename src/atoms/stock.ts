"use client";
import { atom } from "recoil";
import { PersistStorage, recoilPersist } from 'recoil-persist'

export interface StockItem {
  id: number,
  serial: string,
  title: string,
  stock: number,
  payload: number,
  all: number
}

const localStorage = typeof window !== `undefined` ? window.localStorage : null

const { persistAtom } = recoilPersist({
  key: 'stock-persist',
  storage: localStorage as PersistStorage
})

export const StockState = atom<StockItem[]>({
  key: 'stock', 
  default: [],
  effects: [persistAtom]
});