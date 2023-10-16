import React from 'react'
import { useDispatch } from 'react-redux'
import { Sort as SortType, SortPropertyEnum } from '../redux/filter/types'
import { setSort } from '../redux/filter/slice'

type SortItem = {
    name: string;
    sortProperty: SortPropertyEnum;
}

type SortPopupProps = {
    value: SortType
}

export const List: SortItem [] = [
    {name: 'популярні', sortProperty: SortPropertyEnum.RATING_DESC},
    {name: 'не популярні', sortProperty: SortPropertyEnum.RATING_ASC},
    {name: 'найдорожчі', sortProperty: SortPropertyEnum.PRICE_DESK},
    {name: 'найдешевші', sortProperty: SortPropertyEnum.TITLE_ASC},
    {name: 'від А до Я', sortProperty: SortPropertyEnum.TITLE_DESC},
    {name: 'від Я до А', sortProperty: SortPropertyEnum.TITLE_ASC}
]

export const Sort: React.FC<SortPopupProps> = React.memo(({value}) => {
    /* Перелає дії в Redux */
    const dispatch = useDispatch()
    /* Отримую ссилку на sort */
    const sortRef = React.useRef<HTMLDivElement>(null)
    /* Для відораження PopUp */
    const [open, setOpen]=React.useState(false)
    /* Функція вибирає тип сортування і після цього закриває його */
    const onClickListItem=(obj: SortItem)=>{
        dispatch(setSort(obj))
        setOpen(false)
    }
    
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current) {
                let target = event.target as Node | null;
                while (target) {
                    if (target === sortRef.current) {
                        return; // Клік відбувся всередині sortRef, нічого не робимо
                    }
                    target = target.parentNode;
                }
                setOpen(false); // Клік відбувся поза sortRef
            }
        }
    
        document.body.addEventListener('click', handleClickOutside);
    
        return () => document.body.removeEventListener('click', handleClickOutside);
    }, []);

    return(
        <div ref={sortRef} className="sort">
            <div className="sort__label">
            <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#2C2C2C"
            />
            </svg>
            <b onClick={()=>setOpen(!open)}>Сортування по:</b>
            <span onClick={()=>setOpen(!open)}>{value.name}</span>
            </div>
            {open && 
                <div className="sort__popup">
                    <ul>
                        {/* З цього масиву обєктів List який я зробив я витягую obj.name */}
                        {List.map((obj, i)=>(
                            <li 
                                key={i} 
                                onClick={()=>onClickListItem(obj)} 
                                className={value.sortProperty === obj.sortProperty ? 'active':''}>
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )}
)
