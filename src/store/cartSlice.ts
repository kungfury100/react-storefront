import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CartProduct } from '@/models/CartProduct'
import { getStoredCart } from '@/pages/util/cart'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: getStoredCart()
  },
  reducers: {
    pushToCart: (state, action: PayloadAction<CartProduct>) => {
      state.items.push(action.payload)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1)
    },
    updateQuantity: (state, action: PayloadAction<{ index: number, quantity: number }>) => {
      state.items[action.payload.index].quantity = action.payload.quantity
    },
    clearCart: (state) => {
      state.items = []
    },
    setCart: (state, action: PayloadAction<CartProduct[]>) => {
      state.items = action.payload
    }
  }
})

export const { pushToCart, removeFromCart, updateQuantity, clearCart, setCart } = cartSlice.actions
export default cartSlice.reducer