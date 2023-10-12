import { Rootstate } from "../store"

export const selectCart = (state: Rootstate) => state.cart
export const selectCartItemById = (id: string) => (state: Rootstate) => state.cart.items.find((obj) => obj.id == id)