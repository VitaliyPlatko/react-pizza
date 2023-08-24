import React, { useContext } from 'react'
import axios from 'axios';
import qs from 'qs'

import Categories from '../components/Categories';
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";

import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';

import { useDispatch, useSelector } from 'react-redux';
import { setCategotyId } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { List } from 'react-content-loader';

function Home () {
    /* Це функція яка буде міняти наш стейт */
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = React.useRef(false)
    const {categoryID, sort, setFilters} = useSelector(state => state.filter)

    /* Функція буде вибирати id котегорії і передає її в Redux через useDispatch */
    const onChangeCategory = (id) =>{
        dispatch(setCategotyId(id))
    }
    
    const fetchPizzas=()=>{
        setIsLoading(true)


        const sortBy = sort.sortProperty.replace('-','')
        const order = sort.sortProperty.includes('-')?'asc':'desc'
        const category = categoryID>0?`category=${categoryID}`:''
        const search = serchValue ? `search=${serchValue}`:''


        try {
           axios.get(`https://64bfe44b0d8e251fd111a443.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}&search=${serchValue}`)
            .then((res)=>{
                setItems(res.data)
                setIsLoading(false)
            })
        } catch (error) {
            console.log('Помилка при відправленні даних на сервер');
        }
        window.scrollTo(0,0)
    }


    const {serchValue} = useContext(SearchContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1)

    //! Для парсингу параметрів
    React.useEffect(()=>{
        if(window.Location.search){
            const params = qs.parse(window.Location.search.substring(1))
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
        if(!isSearch.current){
            fetchPizzas()
        }  //Якщо тут нічого немає то робимо false
        isSearch.current = false
    },[categoryID, sort.sortProperty, serchValue, currentPage])

    //! вшивання параметрів  їх в адресну стрічку
    React.useEffect(()=>{
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryID,
            currentPage,
        })
        navigate(`?${queryString}`)
    },[categoryID, sort.sortProperty, currentPage])


    const pizzas = items.map((obj)=>(<PizzaBlock key={obj.id} {...obj}/>))
    const skeletons = [...new Array(8)].map((_, index)=><Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryID} onChangeCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Всі піцци</h2>
            <div className="content__items">{isLoading?skeletons:pizzas}</div>
            <Pagination onChangePage={(number)=>setCurrentPage(number)} />
        </div>
    )
}

export default Home