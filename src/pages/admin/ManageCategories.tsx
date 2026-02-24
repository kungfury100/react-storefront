import AddCategory from '@/components/AddCategory'
import { useEffect, useState } from 'react'
import { X } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import type { Category } from '@/models/Category'

function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch(import.meta.env.VITE_DB_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json))
  }, [])

  const deleteCategory = (id: number, index: number) => {
    categories.splice(index, 1)
    setCategories(categories.slice())
    fetch(import.meta.env.VITE_DB_URL + "/categories/" + id, {
      method: "DELETE"
    })
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-2xl font-semibold">Manage categories</h1>
      <h2 className="text-lg font-semibold">Add a new category</h2>
      <AddCategory updateCategories={setCategories}/>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Date created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell className="whitespace-normal break-all">
                  <Button
                    onClick={() => deleteCategory(category.id, index)}
                    size="icon"
                    variant="outline"
                    aria-label="Submit"
                  >
                    <X />
                  </Button>
                </TableCell>
                <TableCell>{category.id}</TableCell>
                <TableCell className="whitespace-normal break-words">
                  {category.name}
                </TableCell>
                <TableCell>
                  <img className="w-[100px] h-[100px] object-cover" src={category.avatar} alt={category.name} />
                </TableCell>
                <TableCell className="whitespace-normal break-words">
                  {category.createdAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  )
}

export default ManageCategories