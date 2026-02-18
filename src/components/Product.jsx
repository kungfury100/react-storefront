import { Button } from '@/components/ui/button'
import { getStoredProducts } from '@/pages/util/cart'
import { Check, ShoppingBag } from "lucide-react"
import { Link } from 'react-router-dom'
import { toast } from "sonner"

function Product({product, index}) {

  const addToCart = (clickedProduct) => {
    const cartLS = getStoredProducts(); // ostukorvis oleva toote ID     klikitud toote ID
    const found = cartLS.find(cartProduct => cartProduct.product.id === clickedProduct.id);
    if (found) {
       found.quantity++;
    } else {
      cartLS.push({product: clickedProduct, quantity: 1});
    }
    localStorage.setItem("cart", JSON.stringify(cartLS));
  }

  return (
    <div key={product.id} className="grid w-full grid-cols-[2rem_100px_minmax(0,1fr)_auto] items-center gap-4 py-8">
      <div className="text-right">{index + 1}.</div>
      {product.image && <img className="w-[100px] h-[100px] object-cover" src={product.image} alt={product.description} />}
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
  )
}

export default Product