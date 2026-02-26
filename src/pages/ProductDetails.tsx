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

const INITIAL_PRODUCT = {
  id: 0,
  title: "",
  price: 0,
  description: "",
  category: "",
  image: "",
  active: false,
  count: 0,
  rating: 0
}


function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product>(INITIAL_PRODUCT)
  const [isLoaded, setIsLoaded] = useState(false)
  const [score, setScore] = useState(33);

  useEffect(() => {
    fetch(`${PRODUCTS_API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .finally(() => setIsLoaded(true))
  }, [id])

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

  const updateScore = async() => {
    product.rating = (product.rating * product.count + score) / (product.count + 1);
    product.count++;
    await fetch(PRODUCTS_API_URL + "/" + product.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
    .then(res => res.json())
    .then(json => setProduct(json))
  }

  if (isLoaded && (!product || !product.id)) {
    return <Navigate to="/notfound" replace />
  }

  if (!product) {
    return null
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
      </div>
      <div className="w-[50%]">
        Give your score
        <div className="flex flex-row gap-4">
          <Slider onValueChange={(value) => setScore(value[0])} defaultValue={[33]} max={100} step={1} />
            <p>{score}</p>
          <Button variant="secondary" onClick={updateScore}>
            Insert
          </Button>
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
                {product.rating.toFixed(1)}% ({product.count})
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