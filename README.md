# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




<!-- 
 const { cartItems, totalPrice } = useCart();
    const navigate = useNavigate();
    const [showWarning, setShowWarning] = useState(false)
    const buttonRef = useRef(null)
    const totalPoints = cartItems.reduce((sum, item) => sum * item.pv, 0);


    const handlePaymentClick = () => {
        if (cartItems.length === 0) {
            setShowWarning(true)
            // alert('ກະຕ່າຂອງທ່ານຍັງວ່າງ. ກະລຸນາເລືອກສິນຄ້າກ່ອນ.');
        } else {
            navigate('/payment', {state: totalPrice, itemCount: cartItems.length});
        }
    };

 -->









<!-- 
  CartContext code 
  import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


  const addToCart = (product) => {
    // console.log('Adding to cart:', product);
    setCartItems((prevItems) => {
      const newItems = [...prevItems, product];
      //   console.log('New cart state:', newItems);
      return newItems;
    });
  };
  //   console.log('Current cart items:', cartItems);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((sum, item) => sum + item.price, 0);
      setTotalPrice(total)
    }

    calculateTotalPrice();
  }, [cartItems])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, totalPrice }}>
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
 -->