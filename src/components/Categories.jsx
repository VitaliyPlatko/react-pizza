import React from 'react'

//1 в нас є div i ul. Наше завдання зроити так щоб задавався клас active на відповідну категорію
function Categories ({value, onChangeCategory}) {    
    //Цей масив потрібно перетворити в масив елементів li
    const categories = ['Всі','Мясні','Вегетеріанські','Гриль','Гострі','Закриті']

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

export default Categories