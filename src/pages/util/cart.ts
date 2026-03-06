import type { CartProduct } from "@/models/CartProduct"

export const getStoredCart = () => {
  const storedProducts = localStorage.getItem("cart")
  if (!storedProducts) {
    return []
  }

  try { 
    return JSON.parse(storedProducts)
  } catch {
    return []
  }
}

export const sum = (cart: CartProduct[]) => {
  let sum = 0
   cart.forEach((cartProduct) => {
     if (cartProduct && cartProduct.product && cartProduct.product.price) {
       sum = sum + Number(cartProduct.product.price) * cartProduct.quantity
     }
   })
  return sum
}

export const cartCount = () => {
  const cart = getStoredCart();
  let sum = 0
  cart.forEach((cartProduct: CartProduct) => {
    sum = sum + cartProduct.quantity
  })
  return sum
}