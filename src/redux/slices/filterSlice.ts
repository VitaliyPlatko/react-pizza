/* Витягую функцію для створення слайсу */
import { createSlice } from "@reduxjs/toolkit"
import { Rootstate } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESK = 'price',
  PRICE_ASK = '-price',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
}

export interface FilterSliceState {
  serchValue: String;
  categoryID: number;
  sort: Sort;
  currentPage: number,
}

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

export const selectSort = (state: Rootstate) => state.filter.sort
export const selectFilter = (state: Rootstate) => state.filter
/* Всі методи які будуть в reducers вонпи будуть в actions */
export const { setCategotyId, setSort, setFilters, setSearchValue } = filterSlice.actions
export default filterSlice.reducer;