import React, { createContext, useContext, useMemo, useState } from "react";

// Item shape: { id, name, priceLabel, price, image, qty }
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product, qty = 1) => {
    // product: { id?, name, price (label string 'R$ 2,35' or number), image }
    const name = product?.name ?? "Produto";
    const image = product?.image;
    const priceLabel = normalizePriceLabel(product?.price);
    const price = parsePrice(priceLabel);
    const id = product?.id ?? `${name}-${price}`;

    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === id);
      if (idx >= 0) {
        const copy = prev.slice();
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { id, name, image, priceLabel, price, qty, lanchoneteId: product?.lanchoneteId }];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, clearCart, total }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}

export function parsePrice(label) {
  if (typeof label === "number") return label;
  if (!label) return 0;
  // Ex.: "R$ 2,35" => 2.35
  const cleaned = String(label)
    .replace(/[^0-9,.-]/g, "")
    .replace(/\./g, "") // remove thousand separators
    .replace(/,/, ".");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export function formatBRL(n) {
  try {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  } catch (_) {
    return `R$ ${n.toFixed(2)}`.replace(".", ",");
  }
}

function normalizePriceLabel(price) {
  // If a number, format to 'R$ x,xx'; if string, return as-is
  if (typeof price === "number") return formatBRL(price);
  if (!price) return "R$ 0,00";
  return String(price);
}
