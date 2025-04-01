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

  const addToCart = (id: number, quantity = 1) => {
    const existingItem = cart.find((item) => item.id === id); //checking if product exists in cart

    if (existingItem) {
      //if product exists increment quantity
      setCart(
        cart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const newItem = watches.find((watch) => watch.id === id); //if product doesnt exist in cart
      if (newItem) {
        setCart([...cart, { ...newItem, quantity }]); //load the cart + the new product and quantity
      }
    }
  };

  const removeFromCart = (id: number) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      //if product is in cart
      if (cartItem.quantity === 1) {
        //if quantity is equal to 1
        setCart(cart.filter((item) => item.id !== id)); //filtering the cart to remove the product
      } else {
        setCart(
          cart.map(
            (item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item //else loading the item + decrementing the quantity
          )
        );
      }
    }
  };

  const clearCart = () => {
    setCart([]); //setting the cart to an empty array
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
