/* Витягую функцію для створення слайсу */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  totalPrice: 0,
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // Ми знаходимо цей обєкт у якого obj.id === action.payload.id 
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      // Тоді ми цьому обєкту роимо count++ 
      if(findItem){
        findItem.count++
      }else{
        // Такого обєкту немає і ми додаємо його в масив
        state.items.push({
          //беремо все що прийшло з компоненту і додаємо в кінець
          ...action.payload,
          count:1
        })
      }
      state.totalPrice = state.items.reduce((sum, obj)=>{
        return obj.price * obj.count + sum;
      },0)
    }, 
    minusItem(state, action){
      const findItem = state.items.find(obj => obj.id === action.payload)
      if(findItem)findItem.count--
    },
    /* (Видалення) Знаходжу обєкт в якгого id не співпадає з action.payload */
    removeItem(state, action) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    /* Для очищення корзини */
    clearItems(state) {
      state.items = []
      state.totalPrice=0
    },
  }
})

/* Всі методи які будуть в reducers вонпи будуть в actions */
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions
export default cartSlice.reducer;