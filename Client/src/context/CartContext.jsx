import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  // ADD TO CART
  const addToCart = (item) => {

    const itemId = item._id || item.id;

    const existingItem = cartItems.find(
      (cartItem) =>
        (cartItem._id || cartItem.id) === itemId
    );

    if (existingItem) {

      setCartItems(
        cartItems.map((cartItem) =>
          (cartItem._id || cartItem.id) === itemId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );

    } else {

      setCartItems([
        ...cartItems,
        {
          ...item,
          quantity: 1,
        },
      ]);

    }
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {

    setCartItems(
      cartItems.filter(
        (item) =>
          (item._id || item.id) !== id
      )
    );
  };

  // INCREASE QTY
  const increaseQty = (id) => {

    setCartItems(
      cartItems.map((item) =>
        (item._id || item.id) === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // DECREASE QTY
  const decreaseQty = (id) => {

    setCartItems(
      cartItems
        .map((item) =>
          (item._id || item.id) === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // TOTAL PRICE
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const clearCart = () => {

  setCartItems([]);

};

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);