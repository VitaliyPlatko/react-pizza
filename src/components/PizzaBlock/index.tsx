import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { CartItems } from "../../redux/cart/types"
import { addItem } from "../../redux/cart/slice"
import { selectCartItemById } from "../../redux/cart/selectors"
import { Link } from "react-router-dom"

const typeNames = ['тонка','традиційна']

type PizzaBlockProps={
    id: string, 
    title: string, 
    price: number, 
    imageUrl: string, 
    sizes: number[], 
    types: number[],
}

export const PizzaBlock: React.FC<PizzaBlockProps> =({
    id, 
    title, 
    price, 
    imageUrl, 
    sizes, 
    types})=>{
    
    const dispatch = useDispatch()
    const cartItem = useSelector(selectCartItemById(id))
    const [activeType, setActiveType]=React.useState(0)
    const [activeSize, setActiveSize]=React.useState(0)

    const addedCount = cartItem?cartItem.count:0;

    const onClickAdd=()=>{
        /* Такий обєкт в мене буде зберігатись в Redux */
        const item: CartItems ={
            id,
            title,
            price,
            imageUrl,
            types: typeNames[activeType],
            sizes: sizes[activeSize],
            count: 0
        }
        
        dispatch(addItem(item))
        console.log(item)
        
    }

    return(
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <Link to={`/pizza/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={imageUrl}
                        alt="Pizza"
                    />
                </Link>
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((typeId)=>(
                            <li 
                                key={typeId}
                                /* Змінює типи піц */
                                onClick={()=>setActiveType(typeId)}
                                className={activeType === typeId ? 'active':''}>
                                {typeNames[typeId]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {sizes.map((size, i)=>(
                            <li 
                                key={size}
                                /* змінює розміри піц */
                                onClick={()=>setActiveSize(i)}
                                className={activeSize === i ? 'active':''}>{size} см.</li>
                        ))}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">від {price} грн.</div>
                    <button onClick={onClickAdd} className="button button--outline button--add">
                    <span>Додати</span>
                    {addedCount >0 &&<i>{addedCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    )
}