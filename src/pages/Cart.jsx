import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react';

const CART_STORAGE_KEY = "cart"
const PRODUCTS_STORAGE_KEY = "storefront-products"

const getStoredProducts = () => {
  const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY)
  if (!storedProducts) {
    return []
  }

  try {
    return JSON.parse(storedProducts)
  } catch {
    return []
  }
}

const getSyncedCart = () => {
  const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || []
  const products = getStoredProducts()

  if (products.length === 0) {
    return cart
  }

  const productIds = new Set(products.map((product) => product.id))
  return cart.filter((cartProduct) => productIds.has(cartProduct.id))
}

function Cart() {
  const [cart, setCart] = useState(getSyncedCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const deleteProduct = (index) => {
    cart.splice(index,1);
    setCart(cart.slice());
  }

  const Sum = () => {
    let sum = 0
    cart.forEach(product => sum = sum + product.price)
    return sum;
  }


  return (
    <div>
      {cart.length === 0 && <div>Cart is empty</div>}
      
      {cart.length > 0 &&
      <div>
        {cart.map((product, index) => 
          <div key={index} className="grid w-full grid-cols-[2rem_100px_minmax(0,1fr)_auto] items-center gap-4 py-8">
            <div className="text-right">{index + 1}.</div>
            <img className="w-[100px]" src={product.image} alt={product.description} />
            <div className="min-w-0"> 
              <div>{product.title}</div>
              <div>{product.price}€</div>
            </div>
            <div className="justify-self-end">
              <Button onClick={() => deleteProduct(index)} size="icon" aria-label="Submit">
                <X />
              </Button>
            </div>
          </div>
        )}
        <br />
       
        {cart.length > 0 &&
        <>
          <div>Quantity: {cart.length} pcs</div>
          <div>Total: {Sum()}€</div>
        </>
        }
      </div>
      }
    </div>
  )
}

export default Cart