import { ReactNode, createContext, useContext, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  image: string[];
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

type CartProviderProps = {
  children: ReactNode;
};

export default function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const addToCart = async (id: number, quantity = 1) => {
    const response = await fetch("http://localhost:3000/api/cart/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, quantity }),
    });
    const data = await response.json();
    if (response.ok && Array.isArray(data)) {
      setCart(data);
    }
  };

  const removeFromCart = async (id: number) => {
    const response = await fetch("http://localhost:3000/api/cart/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (response.ok && Array.isArray(data)) {
      setCart(data);
    }
  };

  const clearCart = async () => {
    const response = await fetch("http://localhost:3000/api/cart/clear-cart", {
      method: "DELETE",
    });
    if (response.ok) {
      setCart([]);
    } else {
      throw new Error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
