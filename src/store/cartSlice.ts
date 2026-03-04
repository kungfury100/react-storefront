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
    // Add product to cart
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      state.items.push(action.payload)
    },
    // Remove product by index
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1)
    },
    // Update quantity
    updateQuantity: (state, action: PayloadAction<{ index: number, quantity: number }>) => {
      state.items[action.payload.index].quantity = action.payload.quantity
    },
    // Clear entire cart
    clearCart: (state) => {
      state.items = []
    },
    // Set entire cart (for loading from localStorage)
    setCart: (state, action: PayloadAction<CartProduct[]>) => {
      state.items = action.payload
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } = cartSlice.actions
export default cartSlice.reducer