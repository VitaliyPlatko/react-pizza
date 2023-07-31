import React from "react";
import './scss/app.scss'

import Header from "./components/Header";

import Home from "./Pages/Home";
import Cart from "./Pages/Cart"
import NotFound from "./Pages/NotFound";

import {Route, Routes} from "react-router";

function App() {
  /* Стейт для інпуту */
  const[serchValue, setSearchValue] = React.useState('')
  console.log(serchValue);

  return (
    <div className="wrapper">
      <Header serchValue={serchValue} setSearchValue={setSearchValue}/>
      <div className="content">
            <Routes>
              <Route path="/" element={<Home serchValue={serchValue}/>}/> 
              <Route path="/cart" element={<Cart/>}/> 
              <Route path="*" element={<NotFound/>}/> 
            </Routes>
      </div>
    </div>
  );
}

export default App;