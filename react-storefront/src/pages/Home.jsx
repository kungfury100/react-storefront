import React, { useState } from 'react'
import Products from "../data/products.json"
import { Button } from '@/components/ui/button'

const PRODUCTS_STORAGE_KEY = "storefront-products"

const getStoredProducts = () => {
  const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY)
  if (!storedProducts) {
    return Products.slice()
  }

  try {
    return JSON.parse(storedProducts)
  } catch {
    return Products.slice()
  }
}

function Home() {
  const [products, setProducts] = useState(getStoredProducts)

  const addToCart = (product) => {
    const cartLS = JSON.parse(localStorage.getItem("cart")) || [];
    cartLS.push(product);
    localStorage.setItem("cart", JSON.stringify(cartLS));
  }

  const resetProducts = () => {
    const resetList = Products.slice()
    setProducts(resetList)
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(resetList))
  }

  const calculateTotal = () => {
    let sum = 0
    products.forEach((product) => {
      sum = sum + product.price
    })
    return sum
  }

  return (
    <div>
      {products.map((product, index) => 
        <div key={product.id} className="grid w-full grid-cols-[2rem_100px_minmax(0,1fr)_auto] items-center gap-4 py-8">
          <div className="text-right">{index + 1}.</div>
          <img className="w-[100px]" src={product.image} alt={product.description} />
          <div className="min-w-0">
            <div>{product.title}</div> 
            <div>{product.price}€</div> 
          </div>
          <div className="justify-self-end">
            <Button onClick={() => addToCart(product)}>Add to cart</Button>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-4">
        <div>{products.length} items</div>
        <Button variant="outline" onClick={resetProducts}>Reset</Button>
      </div>

      <div className="mt-2">Total: {calculateTotal()} €</div>
    </div>
  )
}

export default Home