import { useState, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Shop } from "@/models/shop"

const SHOPS_API_URL = import.meta.env.VITE_DB_URL_2 + "/Shops"

interface AddShopProps {
  updateShops: (shops: Shop[]) => void
}

const initialShop = {
  name: "",
  street: "",
  buildingNumber: "",
  countryCode: "",
  city: "",
  addressLatitude: "",
  addressLongitude: "",
}

function AddShop({ updateShops }: AddShopProps) {
  const [shop, setShop] = useState(initialShop)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShop((prev) => ({ ...prev, [name]: value }))
  }

  const addShop = async () => {
    const payload = {
      name: shop.name,
      street: shop.street,
      buildingNumber: shop.buildingNumber,
      countryCode: shop.countryCode,
      city: shop.city,
      addressLatitude: Number(shop.addressLatitude),
      addressLongitude: Number(shop.addressLongitude),
    }

    await fetch(SHOPS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    setShop(initialShop)

    const res = await fetch(SHOPS_API_URL)
    const data = await res.json()
    updateShops(data)
  }

  return (
    <div className="flex flex-col gap-3">
      <Input name="name" placeholder="Name" value={shop.name} onChange={onChange} />
      <Input name="street" placeholder="Street" value={shop.street} onChange={onChange} />
      <Input name="buildingNumber" placeholder="Building number" value={shop.buildingNumber} onChange={onChange} />
      <Input name="countryCode" placeholder="Country code" value={shop.countryCode} onChange={onChange} />
      <Input name="city" placeholder="City" value={shop.city} onChange={onChange} />
      <Input name="addressLatitude" type="number" step="0.0001" placeholder="Latitude" value={shop.addressLatitude} onChange={onChange} />
      <Input name="addressLongitude" type="number" step="0.0001" placeholder="Longitude" value={shop.addressLongitude} onChange={onChange} />

      <Button type="button" onClick={addShop}>
        Add shop
      </Button>
    </div>
  )
}

export default AddShop