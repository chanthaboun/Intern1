import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Components/Header';
import DetailProduct from './Components/DetailProduct';
import CartProduct from './Components/CartProduct';
import { CartProvider } from './Components/CartContext';
import Payment from './Components/Payment';
import SalesHistory from './Components/SalesHistory';



function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <Header />
            </>
          } />
          {/* <Route path='/' element={<Header />} />
          <Route path='/productlist' element={<ProductList />} /> */}
          <Route path='/product-detail/:id' element={<DetailProduct />} />
          <Route path='/cart-product' element={<CartProduct />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/salehitory' element={<SalesHistory />} />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
