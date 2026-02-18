import React, { useEffect, useState } from 'react'
import { Toaster } from "@/components/ui/sonner"
import SortButtons from '@/components/SortButtons'
import CategoryDropdown from '@/components/CategoryDropdown'
import Product from '@/components/Product'


function Home() {
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([]);

  useEffect(() => {
     fetch(import.meta.env.VITE_DB_URL + "/products")
      .then(res => res.json())
      .then(json => {
        setAllProducts(json)
        setProducts(json)
      })
  }, []);

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-xl font-semibold">React Storefront</h1>
      <SortButtons setProducts={setProducts} />
      <CategoryDropdown dbProducts={allProducts} setProducts={setProducts}/>
      
      <div>{products.length} items currently in stock.</div>
      {products.map((product, index) => 
        <Product key={product.id} product={product} index={index}/>
      )}
      <Toaster position="top-center" />
    </div>
  )
}

export default Home