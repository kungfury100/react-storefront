import React, { useEffect, useState } from 'react'
import Products from "../data/products.json"
import { Button } from '@/components/ui/button'

const PRODUCTS_STORAGE_KEY = "storefront-products"

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
     fetch("https://69933cce8f29113acd406d64.mockapi.io/products")
      .then(res => res.json())
      .then(json => setProducts(json))
  }, []);

  const addToCart = (product) => {
    const cartLS = JSON.parse(localStorage.getItem("cart")) || [];
    cartLS.push(product);
    localStorage.setItem("cart", JSON.stringify(cartLS));
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
          <img className="w-[100px] h-[100px] object-cover" src={product.image} alt={product.description} />
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
      </div>

      <div className="mt-2">Total: {calculateTotal()} €</div>
    </div>
  )
}

export default Home