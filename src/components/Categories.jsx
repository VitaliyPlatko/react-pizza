import React from 'react'

//1 в нас є div i ul. Наше завдання зроити так щоб задавався клас active на відповідну категорію
function Categories () {
    //2 Створюю стейт
    const [activeIndex, setActiveIndex]=React.useState(0)
    
    //Цей масив потрібно перетворити в масив елементів li
    const categories = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые']
    //3 Функція при клуку на категорію буде обирати якусь певну категорію
    const onClickCategory=(index)=>{
    //4 Роблю так, щоб вибралась конкретно та категорія на яку я нажав
        setActiveIndex(index)
    }
    return (
        <div className="categories">
            <ul>
                {   /* Це value в map це значення з масиву categories, тобто в value зберігається весь масив*/
                    /* Якщо ми рендеримо список то в кожного елементу є індекс, ми можемо його отрмати */
                    categories.map((value, i)=>(
                        <li onClick={()=>onClickCategory(i)} className={activeIndex === i ? "active" : ''}>
                            {/* Тут я рендерю значення з масив categories */}
                            {value}
                        </li>
                    ))
                    /* Тепер в нас кожне значення з масиву перетворилось в елемент li */
                    /* Кожен раз коли li уде рендеритись в кожен li уде передаватись index */
                }
            </ul>
        </div>
    )
}

export default Categories

/*  Ця штука onClick={()=>onClickCategory()} робить анонімну функцію яка вже викликає
мою функцію. Я створив анонімну функцію і її виклик при кліку заствить викликати іншу функцію і 
небуде безкінченних перерисовок   

<li onClick={()=>onClickCategory(0)} className={activeIndex === 0 ? "active" : ''}>Все</li>
*/

/*  Якщо я зроблю так onClick={onClickCategory()} - тоді ця штука 
    буде робити дуже багато перерисовок. Це я роблю функцію і зразу її викликаю
    (Компонент ще не відрендерився і я вже роблю перерисовку)  */