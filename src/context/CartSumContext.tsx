import { getStoredCart, sum } from "@/pages/util/cart";
import { createContext, useState, type ReactNode } from "react";

export const CartSumContext = createContext({
  cartSum: 0,
  setCartSum: (_cartSum: number) => {}
});

export const CartSumContextProvider = ({children}: {children: ReactNode}) => {
  const [cartSum, setCartSum] = useState(sum(getStoredCart()));

  return(
    <CartSumContext.Provider value={{cartSum, setCartSum}}>
      {children}
    </CartSumContext.Provider>
  )
}
