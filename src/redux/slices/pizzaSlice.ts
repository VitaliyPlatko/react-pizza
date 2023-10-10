/* Витягую функцію для створення слайсу */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import { Rootstate } from "../store";

type Pizza = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[]
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING // Loading | Success | Panding 
};

export type SearchPizzaParams = {
  sortBy: string,
  order: String,
  category: String,
  search: String,
  currentPage: String,
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
    const { sortBy, order, category, search, currentPage } = params
    const { data } = await axios.get<Pizza[]>(`https://64bfe44b0d8e251fd111a443.mockapi.io/items?page=${currentPage}${category}&sortBy=${sortBy}&order=${order}&search=${search}&limit=4`)
    return data
  }
)

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder)=>{
    builder.addCase(fetchPizzas.pending, (state)=>{
      state.status = Status.LOADING;
      state.items = [];
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action)=>{
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })
    builder.addCase(fetchPizzas.rejected, (state)=>{
      state.status = Status.ERROR
      state.items = [];
    })

    /*
    Варіант без ts

    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    }, */
  },
});

export const selectPizzaData = (state: Rootstate) => state.pizza
export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer;