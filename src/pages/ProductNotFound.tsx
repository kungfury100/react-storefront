import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Annoyed, CornerDownLeft } from "lucide-react"
import { Link } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import notFoundAnimation from "@/assets/404.lottie"

const App = () => {
  return (
    <DotLottieReact
      src={notFoundAnimation}
      loop
      autoplay
      style={{ width: 160, height: 160 }}
    />
  );
};


function ProductNotFound() {
  
  return (
    <div>
      <App />
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Annoyed />
          </EmptyMedia>
          <EmptyTitle>Product not found</EmptyTitle>
          <EmptyDescription>
            The page you’re looking for doesn’t exist or may have been moved. Use one of the options below to continue.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button asChild>
            <Link to="/"><CornerDownLeft /> Back home</Link>
          </Button>
          <Button variant="outline">
            <Link to="/find-us">Contact us</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}

export default ProductNotFound