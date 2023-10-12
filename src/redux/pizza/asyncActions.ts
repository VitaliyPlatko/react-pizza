import axios from "axios"
import { Pizza, SearchPizzaParams } from "./types"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
    const { sortBy, order, category, search, currentPage } = params
    const { data } = await axios.get<Pizza[]>(`https://64bfe44b0d8e251fd111a443.mockapi.io/items?page=${currentPage}${category}&sortBy=${sortBy}&order=${order}&search=${search}&limit=4`)
    return data
  }
)