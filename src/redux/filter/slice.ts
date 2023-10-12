/* Витягую функцію для створення слайсу */
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  serchValue: '',
  /* Тип категорії (ID) 0 тому, що всі вибарні по замовчуванню*/
  categoryID: 0,
  /* Тип сортування */
  currentPage: 1,
  sort: {
    name: 'популярні',
    sortProperty: SortPropertyEnum.RATING_DESC
  }
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    /* метод буде зберігати id категорії. При виклику dispatch наш метод отримає стейт і дію (action (команда))  */
    setCategotyId(state, action: PayloadAction<number>) {
      state.categoryID = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.serchValue = action.payload
    },
    /* Метод відповідає за сортування */
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort
      state.currentPage = Number(action.payload.currentPage)
      state.categoryID = Number(action.payload.categoryID)
    }
  }
})

/* Всі методи які будуть в reducers вонпи будуть в actions */
export const { setCategotyId, setSort, setFilters, setSearchValue } = filterSlice.actions
export default filterSlice.reducer;