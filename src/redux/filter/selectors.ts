import { Rootstate } from "../store"

export const selectSort = (state: Rootstate) => state.filter.sort
export const selectFilter = (state: Rootstate) => state.filter