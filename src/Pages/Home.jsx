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

function Home () {
    /* Це функція яка буде міняти наш стейт */
    const dispatch = useDispatch()
    const navigate = useNavigate()
    /* За допомогою хука useSelector ми можемо витягнути все наше сховище */
    /* Цю фукнцію я використовую для того, щоб витягнути значення з filterSlice  */
    /* Зі сховища верни нам filter, і дай categiryId яке є в filterSlice*/
    /* categoryID - це стейт який я описав в filterSlice */
    const {categoryID, sort} = useSelector(state => state.filter)

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
    const sortBy = sort.sortProperty.replace('-','')
    /* Якщо - є то робить сортування по зростанню інакше по спаданню */
    const order = sort.sortProperty.includes('-')?'asc':'desc'
    const category = categoryID>0?`&category=${categoryID}`:''

    React.useEffect(()=>{
        setIsLoading(true)
        try {
            axios.get(`https://64bfe44b0d8e251fd111a443.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}&search=${serchValue}`)
            .then((res)=>{
                setItems(res.data)
                setIsLoading(false)
            })
        } catch (error) {
            console.log('Помилка при відравленні даних на сервер');
        }
        window.scrollTo(0,0)
    },[categoryID, sort.sortProperty, serchValue, currentPage])

    React.useEffect(()=>{
        if(window.Location.search){
            const params =qs.parse(window.Location.search.substring(1))
        }
    },[])
    

    const pizzas = items.map((obj)=>(<PizzaBlock key={obj.id} {...obj}/>))
    const skeletons = [...new Array(8)].map((_, index)=><Skeleton key={index}/>)

    React.useEffect(()=>{
        /* Якщо нам прийшли параметри томи їх поинні переторити в 1 цілу стрічку (1 ссилку)*/
        const queryString = qs.stringify({
            /* Ці дані які є нижче ми будемо вшивати в адресну стрічку */
            sortProperty: sort.sortProperty,
            categoryID,
            currentPage,
        })
        /* Вшиває в ссилку параметри сортування, фільтрації і номер сторінки */
        navigate(`?${queryString}`)
    },[categoryID, sort.sortProperty, currentPage])

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