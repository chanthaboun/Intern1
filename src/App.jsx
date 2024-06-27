import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Components/Header';
import ProductList from './Components/ProductList';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/header' element={<Header />} />
        <Route path='/productlist' element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
