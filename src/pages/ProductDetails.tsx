import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Check, ShoppingBag } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getStoredCart } from '@/pages/util/cart'
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import type { Product } from "@/models/Product"
import type { CartProduct } from "@/models/CartProduct"

const PRODUCTS_API_URL = import.meta.env.VITE_DB_URL + "/products"

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product>()
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

  const addToCart = (clickedProduct: Product) => {
    const cartLS: CartProduct[] = getStoredCart();
    const found = cartLS.find(cartProduct => cartProduct.product.id === clickedProduct.id);
    if (found) {
        found.quantity++;
    } else {
      cartLS.push({product: clickedProduct, quantity: 1});
    }
    localStorage.setItem("cart", JSON.stringify(cartLS));
  }

  return (
    <div className="flex flex-col gap-4 pt-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-semibold">{product.title}</h1>
      <div>
        <img
          className="w-[180px] h-[180px] object-cover"
          src={product.image}
          alt={product.description}
        />
        <div>
          <div className="w-[180px]">
            Give your score
            <Slider defaultValue={[33]} max={100} step={1} />
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Price</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Description</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {product.price}€
              </TableCell>
              <TableCell>
                {product.rating}% ({product.count})
              </TableCell>
              <TableCell>
                {product.id}
              </TableCell>
              <TableCell>
                {product.description}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    addToCart(product)
                    toast("Product has been added to the cart.", {
                      icon: <Check className="h-4 w-4" />,
                    })
                  }}
                >
                  <ShoppingBag /> Add to cart
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Toaster position="top-center" />
    </div>
  )
}

export default ProductDetails