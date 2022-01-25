import { atom } from "jotai";

export const products = atom<Global.Products.Product[] | undefined>(undefined);
