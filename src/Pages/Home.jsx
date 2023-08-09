import React, { useContext } from 'react'

import Categories from '../components/Categories';
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";

import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';

import { useDispatch, useSelector } from 'react-redux';
import { setCategotyId } from '../redux/slices/filterSlice';

function Home () {
    /* Це функція яка буде міняти наш стейт */
    const dispatch = useDispatch()

    /* За допомогою хука useSelector ми можемо витягнути все наше сховище */
    /* Цю фукнцію я використовую для того, щоб витягнути значення з filterSlice  */
    /* Зі сховища верни нам filter, і дай categiryId яке є в filterSlice*/
    /* categoryId - це стейт який я описав в filterSlice */
    const categoryId = useSelector(state => state.filter.categoryID)
    const sortType = useSelector(state => state.filter.sort.sortProperty)
    

    /* Функція буде вибирати id котегорії і передає її в Redux через useDispatch */
    const onChangeCategory = (id) =>{
        dispatch(setCategotyId(id))
    }

    const {serchValue} = useContext(SearchContext)
    /* Збереження даних з бекенду */
    const [items, setItems] = React.useState([])
    /* Для рендерингу загрузки */
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1)


    /* перевіряє чи є - */
    const sortBy = sortType.replace('-','')
    /* Якщо - є то робить сортування по зростанню інакше по спаданню */
    const order = sortType.includes('-')?'asc':'desc'
    const category = categoryId>0?`category=${categoryId}`:''
    const search = serchValue ? `search=${serchValue}`:''

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
                {/* 4 */}
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Всі піцци</h2>
            <div className="content__items">{isLoading?skeletons:pizzas}</div>
            <Pagination onChangePage={(number)=>setCurrentPage(number)} />
        </div>
    )
}

export default Home