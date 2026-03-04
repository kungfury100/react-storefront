import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCart } from '@/hooks/useCart'

function CartContent() {

  const { cart, deleteProduct, increaseQuantity, decreaseQuantity } = useCart()

  return (
    <div className="flex flex-col gap-6 pt-4">
      {cart.length === 0 && 
        <div>
          No products have been added to the cart.
        </div>
      }

      {cart.length > 0 &&
        <div className="flex flex-col gap-4">
          <div>Unique items in cart: {cart.length} pcs</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead></TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((cp: { product: { image: string; description: string; title: string; price: number }; quantity: number }, index: number) => (
                <TableRow key={index}>
                  <TableCell className="w-[124px]">
                    <img className="w-[100px] h-[100px] object-cover" src={cp.product.image} alt={cp.product.description} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <div className="font-semibold">{cp.product.title}</div>
                      <div className="text-muted-foreground">€{Number(cp.product.price).toFixed(2)}</div>
                      <div className="flex flex-row items-center mt-2">
                        <div className="flex items-center border rounded-md">
                          <Button variant="ghost" onClick={() => decreaseQuantity(index)}>
                            <MinusIcon />
                          </Button>
                          <span className="w-12 text-center rounded py-1">{cp.quantity}</span>
                          <Button variant="ghost" onClick={() => increaseQuantity(index)}>
                            <PlusIcon />
                          </Button>
                        </div>
                        <Button onClick={() => deleteProduct(index)} variant="ghost" aria-label="Delete product" className="ml-2">
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right align-top font-semibold text-lg">
                    €{(Number(cp.product.price) * cp.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
    </div>
  )
}

export default CartContent