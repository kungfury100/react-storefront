import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Check } from "lucide-react"

const CATEGORIES_API_URL = import.meta.env.VITE_DB_URL + "/categories"

const INITIAL_CATEGORY = {
  name: ""
}

function AddCategory(props) {
  const [category, setCategory] = useState(INITIAL_CATEGORY)

  const updateField = (key, value) => {
    setCategory((previousCategory) => ({
      ...previousCategory,
      [key]: value,
    }))
  }

  const submitCategory = async () => {

    await fetch(CATEGORIES_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })

    toast("Category has been added to the store.", {
      icon: <Check classname="h-4 w-4" />
    })

    setCategory(INITIAL_CATEGORY)
    // props. järgi käib võti, kuidas saadeti väärtus siia faili (parenti seest)
    // parent -> kes võttis selle komponendi kasutusele
    // props.updateCategories((previousValues) => [...previousValues, category]);
    const res = await fetch(CATEGORIES_API_URL);
    const json = await res.json();
    props.updateCategories(json);
  }

  return (
   <div className="flex flex-col gap-6">
      <h2>Add category</h2>
      <form className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm">Name</label>
          <Input 
            required 
            value={category.name} 
            onChange={(event) => updateField("name", event.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Avatar URL</label>
          <Input 
            required 
            value={category.avatar} 
            onChange={(event) => updateField("avatar", event.target.value)}
          />
        </div>


        <Button
          type="button"
          onClick={submitCategory}
        >
          Add category
        </Button>
      </form>
      <Toaster position="top-center" />
    </div>
  )
}

export default AddCategory