import { getStoredCart, sum } from "@/pages/util/cart";
import { createContext, useState, type ReactNode } from "react";

export const CartSumContext = createContext({
  cartSum: 0,
  increaseCartSum: (_amount: number) => {},
  decreaseCartSum: (_amount: number) => {},
  zeroCartSum: () => {}
});

export const CartSumContextProvider = ({children}: {children: ReactNode}) => {
  const [cartSum, setCartSum] = useState(sum(getStoredCart()));

  const increaseCartSum = (amount: number) => {
    setCartSum(cartSum + amount);
  }

  const decreaseCartSum = (amount: number) => {
    setCartSum(cartSum - amount);
  }

  const zeroCartSum = () => {
    setCartSum(0);
  }

  return(
    <CartSumContext.Provider value={{cartSum, increaseCartSum, decreaseCartSum, zeroCartSum}}>
      {children}
    </CartSumContext.Provider>
  )
}
