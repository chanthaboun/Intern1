import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // console.log('Adding to cart:', product);
    setCartItems((prevItems) => {
      const newItems = [...prevItems, product];
    //   console.log('New cart state:', newItems);
      return newItems;
    });
  };

//   console.log('Current cart items:', cartItems);

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};