import type { ReactNode } from "react"
import { Button } from "./button"

interface CardInterface {
  children: ReactNode,
  header: ReactNode
}

function Card({children, header}: CardInterface) {
  return (
    <div>
      <h1>{header}</h1>
      {children}
      <Button>Nupp</Button>
    </div>
  )
}

export default Card