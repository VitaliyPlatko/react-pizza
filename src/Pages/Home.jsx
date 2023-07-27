import React from 'react'

import Categories from '../components/Categories';
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";


function Home () {

    /* Збереження даних з бекенду */
    const [items, setItems] = React.useState([])
    /* Для рендерингу загрузки */
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(()=>{
        fetch('https://64bfe44b0d8e251fd111a443.mockapi.io/items')
        /* перетворюю відповідь в json формат */
        .then((res) => res.json()  )
        .then((arr)=>{
            setItems(arr)
            setIsLoading(false)
        })
        window.scrollTo(0,0)
    },[])

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                /*Якщо йде загрузка то створи 6 undefined і заміни їх на Skeleton  */
                    ?[...new Array(8)].map((_, index)=><Skeleton key={index}/>)
                /* Якщо загрузка не йде тоді рендери PizzaBlock */
                    :items.map((obj)=>(<PizzaBlock key={obj.id} {...obj}/>))}
            </div>
        </div>
    )
}

export default Home