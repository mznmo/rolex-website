import { ReactNode, createContext, useContext, useState } from "react";
import watches from "../data.json";

type CartItem = {
  id: number;
  name: string;
  image: string[];
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (id: number) => void;
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

  const addToCart = (id: number) => {
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      const newItem = watches.find((watch) => watch.id === id);
      if (newItem) {
        setCart([...cart, { ...newItem, price: newItem.price, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = (id: number) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      if (cartItem.quantity === 1) {
        setCart(cart.filter((item) => item.id !== id));
      } else {
        setCart(
          cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      }
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
