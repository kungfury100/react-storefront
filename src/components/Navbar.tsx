import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import type { CartProduct } from '@/models/CartProduct'
import { CartSumContext } from '@/context/CartSumContext'
import { AuthContext } from '@/context/AuthContext'
import { Button } from './ui/button'


export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const {cartSum} = useContext(CartSumContext);
  const {isLoggedIn, handleLogout} = useContext(AuthContext);
  // const navigate = useNavigate();

  const getCartCount = () => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      return storedCart.reduce((sum: number, cartProduct: CartProduct) => {
        const quantity = Number(cartProduct?.quantity ?? 1)
        return sum + (Number.isFinite(quantity) ? quantity : 0)
      }, 0)
    } catch {
      return 0
    }
  }

  // const logout = () => {
  //   setIsLoggedIn(false);
  //   navigate("/")
  // }

  useEffect(() => {
    const syncCartCount = () => setCartCount(getCartCount())

    syncCartCount()
    window.addEventListener("storage", syncCartCount)
    const interval = window.setInterval(syncCartCount, 500)

    return () => {
      window.removeEventListener("storage", syncCartCount)
      window.clearInterval(interval)
    }
  }, [])

  return (
    <div className="bg-background border-b relative z-50">
      <div className="layout-shell py-2 flex items-center justify-between">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/" className={navigationMenuTriggerStyle()}>
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/find-us" className={navigationMenuTriggerStyle()}>
                Find us
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/cart" className={navigationMenuTriggerStyle()}>
                Cart ({cartCount}) {cartSum.toFixed(2)}€
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-1">
                Admin area
              </NavigationMenuTrigger>
              <NavigationMenuContent className="z-50">
                <ul className="grid w-[240px] gap-1 p-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/admin">Dashboard</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/admin/manage-products">Manage products</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/admin/manage-categories">Manage categories</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/admin/manage-shops">Manage shops</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {!isLoggedIn ?
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/login" className={navigationMenuTriggerStyle()}>
                      Login
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/signup" className={navigationMenuTriggerStyle()}>
                      Sign Up
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </> :
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/profile" className={navigationMenuTriggerStyle()}>
                      Profile
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button 
                    onClick={handleLogout}
                    className={navigationMenuTriggerStyle()}
                  >
                    Logout
                  </Button>
                </NavigationMenuItem>
              </>
            }
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

