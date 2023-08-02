import React, { useContext } from "react";
import './scss/app.scss'

import Header from "./components/Header";

import Home from "./Pages/Home";
import Cart from "./Pages/Cart"
import NotFound from "./Pages/NotFound";

import {Route, Routes} from "react-router";

export const SearchContext = React.createContext()


function App() {
  /* Стейт для інпуту */
  const[serchValue, setSearchValue] = React.useState('')

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{serchValue, setSearchValue}}>
        <Header />
        <div className="content">
              <Routes>
                <Route path="/" element={<Home/>}/> 
                <Route path="/cart" element={<Cart/>}/> 
                <Route path="*" element={<NotFound/>}/> 
              </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;