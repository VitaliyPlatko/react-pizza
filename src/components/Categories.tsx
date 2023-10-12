import React from 'react'

type CategoriesProps = {
    /* просто значення */
    value: number;
    /*  */
    onChangeCategory: (i: number)=>void;
}

//Цей масив потрібно перетворити в масив елементів li
const categories = ['Всі','Мясні','Вегетеріанські','Гриль','Гострі','Закриті']

//1 в нас є div i ul. Наше завдання зроити так щоб задавався клас active на відповідну категорію
const Categories: React.FC<CategoriesProps> = React.memo(({value, onChangeCategory}) => {
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((categoryName, i)=>(
                        <li 
                            key={i} 
                            onClick={()=>onChangeCategory(i)} 
                            className={value === i ? "active" : ''}>
                            {/* Тут я рендерю значення з масив categories */}
                            {categoryName}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
)
export default Categories