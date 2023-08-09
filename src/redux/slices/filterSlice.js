/* Витягую функцію для створення слайсу */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  /* Тип категорії (ID) 0 тому, що всівибрні по замовчуванню*/
  categoryID: 0,
  /* Тип сортування */
  sort:{
    name: 'популярності',
    sortProperty: 'rating'
  }
}

const filterSlice = createSlice({
  /* Назва слайсу */
  name: 'filter',
  /* початковий стан */
  initialState,
  /* Тепер нам отрібно зробити action які будуть відповідати за збереження сортування і фільтрації */
  reducers:{
    /* метод буде зберігати id категорії. При виклику dispatch наш метод отримає стейт і дію (action (команда))  */
    setCategotyId(state, action){
      /* В стейт ми зберігаємо те, що прийде в action payload */
      state.categoryID = action.payload
    },
    /* Метод відповідає за сортування */
    setSort(state, action){
      state.sort = action.payload
    }
  }
})

/* Всі методи які будуть в reducers вонпи будуть в actions */
export const {setCategotyId, setSort}=filterSlice.actions
export default filterSlice.reducer;