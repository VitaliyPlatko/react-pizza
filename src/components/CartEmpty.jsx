import React from 'react'
import CartEmptyIMG from '../assets/img/empty-cart.png'
import { Link } from 'react-router-dom'

const CartEmpty=()=>{
  return (
    <div className="cart cart--empty">
      <h2>Корзина пуста <icon>😕</icon></h2>
      <p>
        Ви ще не замовляли піццу<br />
        Для того, чтобы замовити піццу, перейди на главну сторінку.
      </p>
      <img src={CartEmptyIMG} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Повернутись назад</span>
      </Link>
  </div>
  )
}

export default CartEmpty