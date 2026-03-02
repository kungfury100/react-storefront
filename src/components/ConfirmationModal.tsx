import { X } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'

interface ConfirmationModalInterface {
  onConfirm: (productId: number, index: number) => void
  deletedObjectId: number,
  index: number
}

function ConfirmationModal(props: ConfirmationModalInterface) {
  
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="icon" variant="outline">
          <X />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your product 
            from the cart.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Close</Button>
            </DialogClose>
            <Button variant="destructive" onClick={() => props.onConfirm(props.deletedObjectId, props.index)} type="submit">Delete product</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal