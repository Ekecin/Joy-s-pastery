"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

type CartLine = { product: Product; quantity: number };
type CartContextType = {
  items: CartLine[]; count: number; subtotal: number;
  add: (product: Product, quantity?: number) => void;
  update: (id: string, quantity: number) => void; remove: (id: string) => void; clear: () => void;
};
const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const saved = localStorage.getItem("joys-pastry-cart"); if (saved) setItems(JSON.parse(saved)); } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("joys-pastry-cart", JSON.stringify(items)); }, [items, ready]);
  const value = useMemo(() => ({
    items, count: items.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: items.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    add: (product: Product, quantity = 1) => setItems((old) => {
      const found = old.find((line) => line.product.id === product.id);
      return found ? old.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + quantity } : line) : [...old, { product, quantity }];
    }),
    update: (id: string, quantity: number) => setItems((old) => quantity < 1 ? old.filter((line) => line.product.id !== id) : old.map((line) => line.product.id === id ? { ...line, quantity } : line)),
    remove: (id: string) => setItems((old) => old.filter((line) => line.product.id !== id)),
    clear: () => setItems([])
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
