import { useEffect, useState } from "react"
import type { Shop } from "@/models/Shop"
import Shops from "@/components/Shops"

const SHOPS_API_URL = import.meta.env.VITE_DB_URL_2 + "/Shops"

function FindUs() {
  const [shops, setShops] = useState<Shop[]>([])

  useEffect(() => {
    fetch(SHOPS_API_URL)
      .then((res) => res.json())
      .then((data) => setShops(Array.isArray(data) ? data : []))
      .catch(() => setShops([]))
  }, [])

  return (
    <Shops shops={shops} />
  )
}

export default FindUs