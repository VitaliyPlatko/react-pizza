import React, { useContext } from 'react'

import Categories from '../components/Categories';
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";

import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';

function Home () {

    const {serchValue} = useContext(SearchContext)

    /* Збереження даних з бекенду */
    const [items, setItems] = React.useState([])
    /* Для рендерингу загрузки */
    const [isLoading, setIsLoading] = React.useState(true)

    const [categoryId, setCategoryID] = React.useState(0)
    const [sortType, setSortType] = React.useState({
        name: 'популярності',
        sortProperty: 'rating'
    })

    /* перевіряє чи є - */
    const sortBy = sortType.sortProperty.replace('-','')
    /* Якщо - є то робить сортування по зростанню інакше по спаданню */
    const order = sortType.sortProperty.includes('-')?'asc':'desc'
    const category = categoryId>0?`category=${categoryId}`:''
    const search = serchValue ? `search=${serchValue}`:''
    const [currentPage, setCurrentPage] = React.useState(1)

    React.useEffect(()=>{
        setIsLoading(true)
        fetch(`https://64bfe44b0d8e251fd111a443.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}&search=${serchValue}`)
        /* перетворюю відповідь в json формат */
        .then((res) => res.json()  )
        .then((arr)=>{
            setItems(arr)
            setIsLoading(false)
        })
        window.scrollTo(0,0)
    },[categoryId, sortType, serchValue, currentPage])

    const pizzas = items.map((obj)=>(<PizzaBlock key={obj.id} {...obj}/>))
    const skeletons = [...new Array(8)].map((_, index)=><Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i)=>setCategoryID(i)}/>
                <Sort value={sortType} onChangeSort={(i)=>setSortType(i)}/>
            </div>
            <h2 className="content__title">Всі піцци</h2>
            <div className="content__items">{isLoading?skeletons:pizzas}</div>
            <Pagination onChangePage={(number)=>setCurrentPage(number)} />
        </div>
    )
}

export default Home