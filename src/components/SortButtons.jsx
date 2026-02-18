import { Button } from '@/components/ui/button'
import { ArrowDown, ArrowUp } from 'lucide-react';

function SortButtons(props) {
  const sortAZ = () => {
      props.setProducts((previousProducts) =>
        previousProducts.slice().sort((a, b) => a.title.localeCompare(b.title))
      )
    }

    const sortZA = () => {
      props.setProducts((previousProducts) =>
        previousProducts.slice().sort((a, b) => b.title.localeCompare(a.title))
      )
    }

    const sortPriceIncreasing = () => {
      props.setProducts((previousProducts) =>
        previousProducts.slice().sort((a, b) => Number(a.price) - Number(b.price))
      )
    }

    const sortPriceDecreasing = () => {
      props.setProducts((previousProducts) =>
        previousProducts.slice().sort((a, b) => Number(b.price) - Number(a.price))
      )
    }

  return (
    
    <div className="flex flex-wrap gap-2">
      <Button onClick={sortAZ} variant="outline">A-Z</Button>
      <Button onClick={sortZA} variant="outline">Z-A</Button>
      <Button onClick={sortPriceIncreasing} variant="outline">Price <ArrowUp /></Button>
      <Button onClick={sortPriceDecreasing} variant="outline">Price <ArrowDown /></Button>
    </div>
  )
}

export default SortButtons