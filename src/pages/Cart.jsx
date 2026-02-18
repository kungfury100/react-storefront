import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon, X } from 'lucide-react';
import { getStoredProducts } from './util/cart';

function Cart() {
  const [cart, setCart] = useState(getStoredProducts);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const deleteProduct = (index) => {
    cart.splice(index,1);
    setCart(cart.slice());
  }

  const decreaseQuantity = (index) => {
    cart[index].quantity--;
    if  (cart[index].quantity === 0) {
      deleteProduct(index);
    }
    setCart(cart.slice());
  }

  const increaseQuantity = (index) => {
    cart[index].quantity++;
    setCart(cart.slice());
  }

  const sum = () => {
    let sum = 0
    cart.forEach((cartProduct) => {
      sum = sum + Number(cartProduct.product.price) * cartProduct.quantity
    })
    return sum.toFixed(2)
  }


  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-xl font-semibold">Cart</h1>
      {cart.length === 0 && <div>No products have been added to the cart.</div>}

      {cart.length > 0 &&
        <div className="flex justify-between">
          <div>
            <div>Unique items in cart: {cart.length} pcs</div>
            <div>Total amount to be paid: {sum()}€</div>
          </div>
          <div>
            <Button variant="secondary" onClick={() => setCart([])}>Tühjenda ostukorv</Button>
          </div>
        </div>
      }
      
      {cart.length > 0 &&
      <div>
        {cart.map((cp, index) => 
          <div key={index} className="grid w-full grid-cols-[2rem_100px_minmax(0,1fr)_auto] items-center gap-4 py-8">
            <div className="text-right">{index + 1}.</div>
            <img className="w-[100px] h-[100px] object-cover" src={cp.product.image} alt={cp.product.description} />
            <div className="min-w-0"> 
              <div>{cp.product.title}</div>
              <div>{cp.product.price}€</div>
              <div className="flex flex-row gap-4">
                <Button size="icon" variant="outline"
                  onClick={() => decreaseQuantity(index)}
                >
                  <MinusIcon />
                </Button>
                <Button size="icon" variant="outline"
                  onClick={() => increaseQuantity(index)}
                >
                  <PlusIcon />
                </Button>
              </div>
              <div>{cp.quantity}</div>
            </div>
            <div className="justify-self-end">
              <Button onClick={() => deleteProduct(index)} size="icon" variant="outline" aria-label="Submit">
                <X />
              </Button>
            </div>
          </div>
        )}
        <br />
      </div>
      }
    
      
    </div>
  )
}

export default Cart