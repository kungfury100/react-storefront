import { useEffect, useState } from "react"
import { X } from "lucide-react"
import AddShop from "@/components/AddShop"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Shop } from "@/models/shop"

const SHOPS_API_URL = import.meta.env.VITE_DB_URL_2 + "/Shops"

function ManageShops() {
  const [shops, setShops] = useState<Shop[]>([])

  useEffect(() => {
    fetch(SHOPS_API_URL)
      .then((res) => res.json())
      .then((data) => setShops(data))
  }, [])

  const deleteShop = async (id: string) => {
    await fetch(`${SHOPS_API_URL}/${id}`, { method: "DELETE" })
    setShops((prev) => prev.filter((shop) => shop.id !== id))
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-2xl font-semibold">Manage shops</h1>

      <AddShop updateShops={setShops} />

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Street</TableHead>
              <TableHead>Building #</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Latitude</TableHead>
              <TableHead>Longitude</TableHead>
              <TableHead>Google Maps</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map((shop) => (
              <TableRow key={shop.id}>
                <TableCell>
                  <Button size="icon" variant="outline" onClick={() => deleteShop(shop.id)}>
                    <X />
                  </Button>
                </TableCell>
                <TableCell>{shop.id}</TableCell>
                <TableCell>{shop.name}</TableCell>
                <TableCell>{shop.street}</TableCell>
                <TableCell>{shop.buildingNumber}</TableCell>
                <TableCell>{shop.countryCode}</TableCell>
                <TableCell>{shop.city}</TableCell>
                <TableCell>{shop.addressLatitude}</TableCell>
                <TableCell>{shop.addressLongitude}</TableCell>
                <TableCell>{shop.googleMaps}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ManageShops