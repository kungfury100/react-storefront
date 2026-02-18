import React, { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star } from "lucide-react"
import { Slider } from "@/components/ui/slider"

const PRODUCTS_API_URL = import.meta.env.VITE_DB_URL + "/products"

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetch(`${PRODUCTS_API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .finally(() => setIsLoaded(true))
  }, [id])

  if (isLoaded && (!product || !product.id)) {
    return <Navigate to="/notfound" replace />
  }

  if (!product) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 pt-4">
      <h1 className="text-xl font-semibold">{product.title}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Rating (Count)</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="whitespace-normal break-all">
              {product.id}
            </TableCell>
            <TableCell>
              <img
                className="w-[240px] h-[240px] object-cover"
                src={product.image}
                alt={product.description}
              />
            </TableCell>
            <TableCell className="whitespace-normal break-words">
              {product.title}
            </TableCell>
            <TableCell>
              {product.category}
            </TableCell>
            <TableCell className="whitespace-normal break-words">
              {product.price}€
            </TableCell>
            <TableCell className="whitespace-normal break-words">
              <Star className="h-4 w-4 text-primary" strokeWidth={2.25} />
              {product.rating} ({product.count})
              <Slider
                defaultValue={[75]}
                max={100}
                step={1}
                className="mx-auto w-full max-w-xs"
              />
            </TableCell>
            <TableCell>
              {String(product.active)}
            </TableCell>
            <TableCell className="whitespace-normal break-all">
              {product.description}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      // Võimalda tootele rating anda
      // Võimalda toote kogu ratingu arvu
      // toote rating = keskmine rating / arvuga -- uus rating
      // uuesti rating arvutada
      // kogu arvule +1
      <Button asChild className="w-fit">
        <Link to="/"><ArrowLeft />Back home</Link>
      </Button>
    </div>
  )
}

export default ProductDetails