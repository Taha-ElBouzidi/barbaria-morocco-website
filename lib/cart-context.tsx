"use client";

import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

export type CartState = Map<string, number>;

type CartAction =
  | { type: "toggle"; key: string }
  | { type: "setQty"; key: string; qty: number }
  | { type: "remove"; key: string }
  | { type: "clear" }
  | { type: "hydrate"; state: CartState };

function cartReducer(state: CartState, action: CartAction): CartState {
  const next = new Map(state);
  switch (action.type) {
    case "toggle":
      if (next.has(action.key)) {
        next.delete(action.key);
      } else {
        next.set(action.key, 1);
      }
      return next;
    case "setQty":
      if (action.qty >= 1) next.set(action.key, action.qty);
      return next;
    case "remove":
      next.delete(action.key);
      return next;
    case "clear":
      return new Map();
    case "hydrate":
      return new Map(action.state);
  }
}

const STORAGE_KEY = "barbaria-cart";

function serializeCart(cart: CartState): string {
  return JSON.stringify([...cart]);
}

function deserializeCart(raw: string): CartState {
  try {
    const entries = JSON.parse(raw) as [string, number][];
    return new Map(entries);
  } catch {
    return new Map();
  }
}

interface CartContextValue {
  cart: CartState;
  toggle: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, new Map<string, number>());

  // Hydrate from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      dispatch({ type: "hydrate", state: deserializeCart(raw) });
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, serializeCart(cart));
  }, [cart]);

  const toggle = useCallback((key: string) => dispatch({ type: "toggle", key }), []);
  const setQty = useCallback((key: string, qty: number) => dispatch({ type: "setQty", key, qty }), []);
  const remove = useCallback((key: string) => dispatch({ type: "remove", key }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const totalItems = [...cart.values()].reduce((sum, qty) => sum + qty, 0);

  return (
    <CartContext.Provider value={{ cart, toggle, setQty, remove, clear, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
