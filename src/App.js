import React, { useEffect } from "react";
import './scss/app.scss'
import Header from "./components/Header";
import Categories from './components/Categories';
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";


function App() {

  /* Збереження даних з бекенду */
  const [items, setItems] = React.useState([])

  React.useEffect(()=>{
    fetch('https://64bfe44b0d8e251fd111a443.mockapi.io/items')
    /* перетворюю відповідь в json формат */
      .then((res) => res.json()  )
      .then((arr)=>{
        setItems(arr)
      })
  },[])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories/>
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {/* Так як я рендерю оєкт я пишу obj, це не обовязково, просто шоб було простіше */}
            {items.map((obj)=>(
                <PizzaBlock key={obj.id} {...obj}/>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;