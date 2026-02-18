import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowDown, ArrowUp, Check, ShoppingBag } from "lucide-react"
import { Link } from 'react-router-dom'

function Home() {
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
     fetch("https://69933cce8f29113acd406d64.mockapi.io/products")
      .then(res => res.json())
      .then(json => {
        setAllProducts(json)
        setProducts(json)
      })
  }, []);

  const sortAZ = () => {
    setProducts((previousProducts) =>
      previousProducts.slice().sort((a, b) => a.title.localeCompare(b.title))
    )
  }

  const sortZA = () => {
    setProducts((previousProducts) =>
      previousProducts.slice().sort((a, b) => b.title.localeCompare(a.title))
    )
  }

  const sortPriceIncreasing = () => {
    setProducts((previousProducts) =>
      previousProducts.slice().sort((a, b) => Number(a.price) - Number(b.price))
    )
  }

  const sortPriceDecreasing = () => {
    setProducts((previousProducts) =>
      previousProducts.slice().sort((a, b) => Number(b.price) - Number(a.price))
    )
  }

  const filterByCategory = (category) => {
    setSelectedCategory(category)

    if (category === "all") {
      setProducts(allProducts)
      return
    }

    setProducts(allProducts.filter((product) => product.category === category))
  }

  const addToCart = (product) => {
    const cartLS = JSON.parse(localStorage.getItem("cart")) || [];
    cartLS.push(product);
    localStorage.setItem("cart", JSON.stringify(cartLS));
  }

  const categories = [...new Set(allProducts.map((product) => product.category))]

  // const calculateTotal = () => {
  //   let sum = 0
  //   products.forEach((product) => {
  //     sum = sum + Number(product.price)
  //   })
  //   return sum
  // }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-xl font-semibold">React Storefront</h1>

      <div className="flex flex-wrap gap-2">
        <Button onClick={sortAZ} variant="outline">A-Z</Button>
        <Button onClick={sortZA} variant="outline">Z-A</Button>
        <Button onClick={sortPriceIncreasing} variant="outline">Price <ArrowUp /></Button>
        <Button onClick={sortPriceDecreasing} variant="outline">Price <ArrowDown> </ArrowDown></Button>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="category-filter">Choose category</label>

        <Select
          value={selectedCategory}
          onValueChange={filterByCategory}
        >
          <SelectTrigger id="category-filter" className="w-full max-w-xs">
            <SelectValue placeholder="Choose category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All products</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>{products.length} items currently in stock.</div>
      {products.map((product, index) => 
        <div key={product.id} className="grid w-full grid-cols-[2rem_100px_minmax(0,1fr)_auto] items-center gap-4 py-8">
          <div className="text-right">{index + 1}.</div>
          <img className="w-[100px] h-[100px] object-cover" src={product.image} alt={product.description} />
          <div className="min-w-0">
            <div>{product.title}</div> 
            <div>{product.price}€</div> 
          </div>
          <div className="justify-self-end flex gap-2">
            <Button asChild variant="outline">
              <Link to={`/product/${product.id}`}>
                View product
              </Link>
            </Button>
            <Button size="icon"
              onClick={() => {
                addToCart(product)
                toast("Product has been added to the cart.", {
                  icon: <Check className="h-4 w-4" />,
                })
              }} 
            >
              <ShoppingBag />
            </Button>
          </div>
        </div>
      )}
      {/* <div className="mt-2">Total: {calculateTotal()} €</div> */}
      <Toaster position="top-center" />
    </div>
  )
}

export default Home