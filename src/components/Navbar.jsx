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
import { Settings } from 'lucide-react'


export default function Navbar() {
  return (
    <div className="bg-background border-b relative z-50">
      <div className="layout-shell py-2">
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
              <Link to="/shops" className={navigationMenuTriggerStyle()}>
                Shops
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/contact" className={navigationMenuTriggerStyle()}>
                Contact
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/cart" className={navigationMenuTriggerStyle()}>
                Cart
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-1">
              <Settings className="h-4 w-4 text-primary" strokeWidth={2.25} />
              Admin
            </NavigationMenuTrigger>
            <NavigationMenuContent className="z-50">
              <ul className="grid w-[240px] gap-1 p-2">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/admin">Admin Home</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/admin/add-product">Add Product</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/admin/maintain-products">Maintain Products</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/admin/maintain-categories">Maintain Categories</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/admin/maintain-shops">Maintain Shops</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

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
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

