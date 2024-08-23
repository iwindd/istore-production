"use client";
import { atom } from "recoil";
import { PersistStorage, recoilPersist } from 'recoil-persist'

const localStorage = typeof window !== `undefined` ? window.localStorage : null

const { persistAtom } = recoilPersist({
  key: 'stock-target-persist',
  storage: localStorage as PersistStorage
})

export const StockTargetState = atom<number | null>({
  key: 'stock-target', 
  default: null,
  effects: [persistAtom]
});