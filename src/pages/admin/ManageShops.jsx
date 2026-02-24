import shops from "../../data/shops.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function ManageShops() {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-2xl font-semibold">Manage shops</h1>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Mon-Fri</TableHead>
              <TableHead>Sat</TableHead>
              <TableHead>Sun</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map((shop, index) => (
              <TableRow key={`${shop.name}-${index}`}>
                <TableCell className="whitespace-normal break-words">{shop.name}</TableCell>
                <TableCell className="whitespace-normal break-words">{shop.address}</TableCell>
                <TableCell>{shop.openingTimes["mon-fri"]}</TableCell>
                <TableCell>{shop.openingTimes.sat}</TableCell>
                <TableCell>{shop.openingTimes.sun}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ManageShops