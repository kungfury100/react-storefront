export const getStoredProducts = () => {
  const storedProducts = localStorage.getItem("cart")
  if (!storedProducts) {
    return []
  }

  try {
    return JSON.parse(storedProducts)
  } catch {
    return []
  }
}