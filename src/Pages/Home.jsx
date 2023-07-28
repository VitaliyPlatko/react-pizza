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

    const [categoryId, setCategoryID] = React.useState(0)
    const [sortType, setSortType] = React.useState({
        name: 'популярності',
        sortProperty: 'rating'
    })

    /* еревіряє чи є - */
    const sortBy = sortType.sortProperty.replace('-','')
    /* Якщо - є то робить сортування по зростанню інакше по спаданню */
    const order = sortType.sortProperty.includes('-')?'asc':'desc'
    const category = categoryId>0?`category=${categoryId}`:''

    React.useEffect(()=>{
        setIsLoading(true)
        fetch(`https://64bfe44b0d8e251fd111a443.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
        /* перетворюю відповідь в json формат */
        .then((res) => res.json()  )
        .then((arr)=>{
            setItems(arr)
            setIsLoading(false)
        })
        window.scrollTo(0,0)
    },[categoryId, sortType])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i)=>setCategoryID(i)}/>
                <Sort value={sortType} onChangeSort={(i)=>setSortType(i)}/>
            </div>
            <h2 className="content__title">Всі піцци</h2>
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