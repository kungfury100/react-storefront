import { useContext, useEffect } from 'react'
import { sum } from '@/pages/util/cart'
import { CartSumContext } from '@/context/CartSumContext'
import { decrement, decrementByAmount, increment, empty } from '@/store/counterSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice'
import emailjs from '@emailjs/browser'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

export function useCart() {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart.items)
  const { increaseCartSum, decreaseCartSum, zeroCartSum } = useContext(CartSumContext)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const emptyCart = () => {
    dispatch(clearCart())
    zeroCartSum()
    dispatch(empty())
  }

  const deleteProduct = (index: number) => {
    decreaseCartSum(cart[index].product.price * cart[index].quantity)
    dispatch(removeFromCart(index))
    dispatch(decrementByAmount(cart[index].quantity))
  }

  const decreaseQuantity = (index: number) => {
    decreaseCartSum(cart[index].product.price)
    const newQuantity = cart[index].quantity - 1
    
    if (newQuantity <= 0) {
      dispatch(removeFromCart(index))
      dispatch(decrementByAmount(1))
    } else {
      dispatch(updateQuantity({ index, quantity: newQuantity }))
      dispatch(decrement())
    }
  }

  const increaseQuantity = (index: number) => {
    increaseCartSum(cart[index].product.price)
    const newQuantity = cart[index].quantity + 1
    dispatch(updateQuantity({ index, quantity: newQuantity }))
    dispatch(increment())
  }

  const sendEmail = () => {
    const templateParams = {
      name: 'James',
      client_email: "karlsimmer@gmail.com",
      cart_sum: sum(cart).toFixed(2),
      order_products: cart.map((cp: typeof cart[number]) => cp.product.title + " | " + cp.product.price + " | " + cp.quantity)
    }

    emailjs
      .send('service_nxwn5s5', 'template_vwj4cfb', templateParams, {
        publicKey: 'pRMbCxIyIZkSdzecw',
      })
      .then(() => {
        console.log('SUCCESS!')
      })
      .catch((error) => {
        console.log('FAILED...', error.text)
      })
  }

  const checkout = async() => {
    sendEmail();
    const res = await fetch(import.meta.env.VITE_DB_URL + "/orders", {
      method: "POST",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const json = await res.json();
    alert(`Tellimus summas ${json.total}€, id ${json.id} meile edastatud`);
    
  }

  return { cart, emptyCart, deleteProduct, checkout, increaseQuantity, decreaseQuantity, sum }
}