import { CartItems } from "../redux/cart/types"
import { calcTotalPrice } from "./calcTotalPrice"


export const getCartFromLS = () => {
  const data = localStorage.getItem('cart')
  //Якщо в data щось є то тоді я буду це парситио
  const items = data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items)

  //якщо в json щось є то тоді
  return {
    /* Це робиться для того щоб items небув any */
    items: items as CartItems[],
    totalPrice
  }
}