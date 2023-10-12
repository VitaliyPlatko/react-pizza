/* Витягую функцію для створення слайсу */
import { createSlice } from "@reduxjs/toolkit"
import { PizzaSliceState, Status } from "./types";
import { fetchPizzas } from "./asyncActions";

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING // Loading | Success | Panding 
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
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


export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer;