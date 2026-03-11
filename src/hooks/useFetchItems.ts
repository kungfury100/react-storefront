import { useEffect, useState } from "react"

interface UseFetchItemsInterface {
  endPoint: string
}

export function useFetchItems<T>(props: UseFetchItemsInterface) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    // fetch(import.meta.env.VITE_DB_URL + "/" + props.endPoint)
    //   .then(res => res.json())
    //   .then(json => setItems(json))

    const getItems = async() => {
      const res = await fetch(import.meta.env.VITE_DB_URL + props.endPoint);
      const json = await res.json();
      setItems(json);
    }
    getItems();
  }, [])

  return items
}