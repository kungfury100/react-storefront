import { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon, X } from 'lucide-react';
import { getStoredCart, sum } from './util/cart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { CartProduct } from '@/models/CartProduct';
import { CartSumContext } from '@/context/CartSumContext';
import { decrement, decrementByAmount, increment, empty } from '../store/counterSlice'
import { useAppDispatch } from '@/store/store';

function Cart() {
  const [cart, setCart] = useState<CartProduct[]>(getStoredCart);
  const {increaseCartSum, decreaseCartSum, zeroCartSum} = useContext(CartSumContext);
  const dispatch = useAppDispatch()

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const emptyCart = () => {
    setCart([]);
    zeroCartSum();
    dispatch(empty());
  }

  const deleteProduct = (index: number) => {
    decreaseCartSum(cart[index].product.price * cart[index].quantity);
    setCart((previousCart) => previousCart.filter((_, i) => i !== index))
    dispatch(decrementByAmount(cart[index].quantity));
  }

  const decreaseQuantity = (index: number) => {
    decreaseCartSum(cart[index].product.price);
    cart[index].quantity--;
    if (cart[index].quantity === 0) {
      cart.splice(index,1);
    }
    setCart(cart.slice());
    dispatch(decrement());
  }

  const increaseQuantity = (index: number) => {
    increaseCartSum(cart[index].product.price);
    cart[index].quantity++;
    setCart(cart.slice());
    dispatch(increment());
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-2xl font-semibold">Cart</h1>
      {cart.length === 0 && <div>No products have been added to the cart.</div>}

      {cart.length > 0 &&
        <div className="flex justify-between">
          <div>
            <div>Unique items in cart: {cart.length} pcs</div>
            <div>Total amount to be paid: {sum(cart).toFixed(2)}€</div>
          </div>
          <div>
            <Button variant="destructive" onClick={emptyCart}>Tühjenda ostukorv</Button>
          </div>
        </div>
      }
      
      {cart.length > 0 &&
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map((cp, index) => (
              <TableRow key={index}>
                <TableCell className="align-middle">
                  <div className="flex flex-row items-center gap-4">
                    <img className="w-[40px] h-[40px] object-cover" src={cp.product.image} alt={cp.product.description} />
                    {cp.product.title}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{cp.product.price}€</div>
                </TableCell>
                <TableCell className="align-middle flex flex-row justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <Button size="icon-xs" variant="outline" onClick={() => decreaseQuantity(index)}>
                      <MinusIcon />
                    </Button>
                    {cp.quantity}
                    <Button size="icon-xs" variant="outline"onClick={() => increaseQuantity(index)}>
                      <PlusIcon />
                    </Button>
                  </div>
                  <div>
                    <Button onClick={() => deleteProduct(index)} size="icon" variant="outline" aria-label="Submit">
                      <X />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      }
    
      
    </div>
  )
}

export default Cart