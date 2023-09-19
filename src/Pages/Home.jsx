import React from 'react'

import qs from 'qs'

import Categories from '../components/Categories';
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";

import { Pagination } from '../components/Pagination';


import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategotyId } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'
import { Link, useNavigate } from 'react-router-dom';
import { List } from 'react-content-loader';


function Home () {
    /* Це функція яка буде міняти наш стейт */
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = React.useRef(false)
    const {categoryID, sort, setFilters, serchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)

    /* Функція буде вибирати id котегорії і передає її в Redux через useDispatch */
    const onChangeCategory = (id) => dispatch(setCategotyId(id))
    const [currentPage, setCurrentPage] = React.useState(1)

    /* Функція ідпоідає за ввзаємодію з бекендом */
    const getPizzas=async()=>{
        const sortBy = sort.sortProperty.replace('-','')
        const order = sort.sortProperty.includes('-')?'asc':'desc'
        const category = categoryID>0?`&category=${categoryID}`:''
        const search = serchValue

        dispatch(fetchPizzas({sortBy, order, category, search, currentPage}))
        window.scrollTo(0,0)
    }

    React.useEffect(()=>{
        /* Якщо він є то тоді ми будемо це парсити */
        if(window.Location.search){
            /* substrin забирає ? з ссилки (арсить і перетворює в обєкт) */
            const params = qs.parse(window.Location.search.substring(1))
            /* Пробігаємось по кожній ластиості sortProperty і в обєкті sortProperty знайти то що є в params.sortProperty */
            const sort = List.find(obj=>obj.sortProperty===params.sortProperty)
            dispatch(
                setFilters({
                    /* Передаю параметри в Redux */
                    ...params,
                    sort
                })
            )
            isSearch.current = true
        }
    },[])


    React.useEffect(()=>{
        getPizzas()
    },[categoryID, sort.sortProperty, serchValue, currentPage])

    // вшивання параметрів в адресну стрічку
    React.useEffect(()=>{
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryID,
            currentPage,
        })
        navigate(`?${queryString}`)
    },[categoryID, sort.sortProperty, currentPage])

    const pizzas = items.map((obj)=><Link to={`/pizza/${obj.id}`} key={obj.id}><PizzaBlock  {...obj}/></Link>)
    const skeletons = [...new Array(8)].map((_, index)=><Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryID} onChangeCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Всі піцци</h2>
            {
                status === 'error'?(
                    <div className='content__error-info'>
                        <h2>Сталась помилка <icon>😕</icon></h2>
                        <p>Не вдалось отримати піцци. Попробуйте повторити спробу пізніше</p>
                    </div>
                    ):(
                    <div className="content__items">{status == 'loading'?skeletons:pizzas}</div>)
            }
            <Pagination onChangePage={(number)=>setCurrentPage(number)} />
        </div>
    )
}

export default Home