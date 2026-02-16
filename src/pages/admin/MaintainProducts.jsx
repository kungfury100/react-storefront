import React, { useEffect, useState } from 'react'
import Products from "../../data/products.json"
import { Star, X } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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

function MaintainProducts() {
  
  const [products, setProducts] = useState(getStoredProducts)

  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const deleteProduct = (index) => {
    setProducts((previousProducts) =>
      previousProducts.filter((_, productIndex) => productIndex !== index)
    )
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell className="whitespace-normal break-all">
                <Button onClick={() => deleteProduct(index)} size="icon" variant="outline" aria-label="Submit">
                  <X />
                </Button>
              </TableCell>
              <TableCell>{product.id}</TableCell>
              <TableCell className="whitespace-normal break-words">{product.title}</TableCell>
              <TableCell>{product.price}€</TableCell>
              <TableCell className="whitespace-normal break-words">{product.category}</TableCell>
              <TableCell>
                <div className="inline-flex items-center gap-1 whitespace-nowrap">
                  {product.rating.rate}
                  <Star className="h-4 w-4 text-primary" strokeWidth={2.25} />
                  ({product.rating.count})
                </div>
              </TableCell>
              <TableCell className="whitespace-normal break-all">{product.image}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default MaintainProducts