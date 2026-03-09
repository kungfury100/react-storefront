import { useEffect, useState } from 'react'
import { Toaster } from "@/components/ui/sonner"
import SortButtons from '@/components/SortButtons'
import CategoryDropdown from '@/components/CategoryDropdown'
import Products from '@/components/Products'
import type { Product } from '@/models/Product'
import { useFetchItems } from '@/hooks/useFetchItems'




function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [products, setProducts] = useState<Product[]>([]);
  const items = useFetchItems<Product>({endPoint: "/products"});

  useEffect(() => {
     setProducts(items);
     setAllProducts(items);
  }, [items]);

  return (
    <div className="flex flex-col gap-6 pt-4">


      <h1 className="text-2xl font-semibold">React Storefront</h1>
      <SortButtons setProducts={setProducts} />
      <CategoryDropdown dbProducts={allProducts} setProducts={setProducts}/>
      <div>{products.length} items currently in stock.</div>
      <Products products={products} />
      <Toaster position="top-center" />
    </div>
  )
}

export default Home