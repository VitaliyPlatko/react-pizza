import React from "react";
import './scss/app.scss'
import { Route, Routes } from "react-router";


import Home from "./Pages/Home";
import Cart from "./Pages/Cart"
import NotFound from "./Pages/NotFound";
import FullPizzas from "./Pages/FullPizza";
import MainLayout from './Layouts/MainLayout';


function App() {
  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>        
          <Route path="" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/pizza/:id" element={<FullPizzas />} />
        </Route>
      </Routes>
  );
}

export default App;