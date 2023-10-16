import React from 'react'

import qs from 'qs'

import { List } from '../components/Sort';
import { Skeleton, PizzaBlock, Categories, Pagination, Sort } from '../components/index'

import { useSelector } from 'react-redux';
import { setCategotyId, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';

import { selectPizzaData } from '../redux/pizza/selectors';
import { SearchPizzaParams } from '../redux/pizza/types';

import { selectFilter } from '../redux/filter/selectors';

const Home: React.FC = () => {
    /* Це функція яка буде міняти наш стейт */
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = React.useRef(false)
    const { categoryID, sort, serchValue } = useSelector(selectFilter)
    const { items, status } = useSelector(selectPizzaData)

    /* Функція буде вибирати id котегорії і передає її в Redux через useDispatch */
    const onChangeCategory = React.useCallback((idx: number) => dispatch(setCategotyId(idx)), [])
    const [currentPage, setCurrentPage] = React.useState(1)

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryID > 0 ? `&category=${categoryID}` : ''
        const search = serchValue
        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage)
            })
        )
        window.scrollTo(0, 0)
    }

    React.useEffect(() => {
        /* Якщо він є то тоді ми будемо це парсити */
        if (!window.location.search) {
            /* substrin забирає ? з ссилки (арсить і перетворює в об'єкт) */
            const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
            /* Пробігаємось по кожній ластиості sortProperty і в об'єкті sortProperty знайти то що є в params.sortProperty */
            const sort = List.find((obj) => obj.sortProperty === params.sortBy);
            dispatch(
                setFilters({
                    serchValue: params.search,
                    categoryID: Number(params.category),
                    currentPage: Number(params.currentPage),
                    /* Якщо прийде undefined тоді передавай перший елемент в списку List а якщо прийде тоді sort */
                    sort: sort || List[0],
                })
            );
            isSearch.current = true;
        }
    }, []);

    React.useEffect(() => {
        getPizzas()
    }, [categoryID, sort.sortProperty, serchValue, currentPage])

    // вшивання параметрів в адресну стрічку
    React.useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryID,
            currentPage,
        })
        navigate(`?${queryString}`)
    }, [categoryID, sort.sortProperty, currentPage])

    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryID} onChangeCategory={onChangeCategory} />
                <Sort value={sort} />
            </div>
            <h2 className="content__title">Всі піцци</h2>
            {
                status === 'error' ? (
                    <div className='content__error-info'>
                        <h2>Сталась помилка <span>😕</span></h2>
                        <p>Не вдалось отримати піцци. Попробуйте повторити спробу пізніше</p>
                    </div>
                ) : (
                    <div className="content__items">{status == 'loading' ? skeletons : pizzas}</div>)
            }
            <Pagination onChangePage={(number: number) => setCurrentPage(number)} />
        </div>
    )
}

export default Home