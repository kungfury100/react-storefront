import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CartSumContext } from '@/context/CartSumContext'
import type { CartProduct } from '@/models/CartProduct'
import type { Product } from '@/models/Product'
import { getStoredCart } from '@/pages/util/cart'
import { Check, ShoppingBag } from "lucide-react"
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "sonner"

function Products({products}: {products: Product[]}) {
  const {cartSum, setCartSum} = useContext(CartSumContext);

  const addToCart = (clickedProduct: Product) => {
    const cartLS: CartProduct[] = getStoredCart(); // ostukorvis oleva toote ID     klikitud toote ID
    const found = cartLS.find(cartProduct => cartProduct.product.id === clickedProduct.id);
    if (found) {
       found.quantity++;
    } else {
      cartLS.push({product: clickedProduct, quantity: 1});
    }
    localStorage.setItem("cart", JSON.stringify(cartLS));
    setCartSum(cartSum + clickedProduct.price);
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Preview</TableHead>
            <TableHead className="w-1/5">Name</TableHead>
            <TableHead className="w-1/5">Price</TableHead>
            <TableHead className="w-1/5">Score</TableHead>
            <TableHead className="w-1/5"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="w-1/5 align-middle">
                {product.image && <img className="w-[100px] h-[100px] object-cover" src={product.image} alt={product.description} />}
              </TableCell>
              <TableCell className="w-1/5 align-middle">
                <div>{product.title}</div>
              </TableCell>
              <TableCell className="w-1/5 align-middle">
                <div>{product.price}€</div>
              </TableCell>
              <TableCell className="w-1/5 align-middle">
                <div>{product.rating.toFixed(1)}%</div>
              </TableCell>
              <TableCell className="w-1/5 align-middle">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Products