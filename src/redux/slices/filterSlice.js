/* Витягую функцію для створення слайсу */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  /* Тип категорії (ID) 0 тому, що всі вибарні по замовчуванню*/
  categoryID: 0,
  /* Тип сортування */
  sort: {
    name: 'популярності',
    sortProperty: 'rating'
  }
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    /* метод буде зберігати id категорії. При виклику dispatch наш метод отримає стейт і дію (action (команда))  */
    setCategotyId(state, action) {
      state.categoryID = action.payload
    },
    /* Метод відповідає за сортування */
    setSort(state, action) {
      /* В стейт ми зберігаємо те, що прийде в action.payload (А туда прийде id категорії) */
      state.sort = action.payload
    },
    setFilters(state, action){
      state.sort = action.payload.sort
      state.currentPage = Number(action.payload.currentPage)
      state.categoryID = Number(action.payload.categoryID)
    }
  }
})

/* Всі методи які будуть в reducers вонпи будуть в actions */
export const { setCategotyId, setSort, setFilters } = filterSlice.actions
export default filterSlice.reducer;
