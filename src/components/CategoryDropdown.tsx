import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Category } from '@/models/Category';
import type { Product } from '@/models/Product';

interface CategoryDropdownInterface {
  dbProducts: Product[],
  setProducts: (products: Product[]) => void
}

function CategoryDropdown({dbProducts, setProducts}: CategoryDropdownInterface) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  // const categories = [...new Set(dbProducts.map((product) => product.category))]
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
      fetch(import.meta.env.VITE_DB_URL + "/categories")
        .then(res => res.json())
        .then(json => setCategories(json))
    }, [])

  const filterByCategory = (categoryName: string) => {
    setSelectedCategory(categoryName)

    if (categoryName === "all") {
      setProducts(dbProducts)
      return
    }

    setProducts(dbProducts.filter((product) => product.category === categoryName))
  }


  return (
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
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default CategoryDropdown