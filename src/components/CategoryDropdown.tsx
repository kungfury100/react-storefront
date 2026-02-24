import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function CategoryDropdown({dbProducts, setProducts}) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  // const categories = [...new Set(dbProducts.map((product) => product.category))]
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      fetch(import.meta.env.VITE_DB_URL + "/categories")
        .then(res => res.json())
        .then(json => setCategories(json))
    }, [])

  const filterByCategory = (category) => {
    setSelectedCategory(category)

    if (category === "all") {
      setProducts(dbProducts)
      return
    }

    setProducts(dbProducts.filter((product) => product.category === category))
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