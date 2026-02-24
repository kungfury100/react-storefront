import shopsFromFile from "../data/shops.json"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import type { Shop } from "@/models/Shop"
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

function Shops() {
  const shops: Shop[] = shopsFromFile as Shop[];

  return (
    <div className="flex flex-col gap-4 pt-4">
      <h1 className="text-2xl font-semibold">Our shops</h1>
      {shops.map((shop, index) => (
        <div key={`${shop.name}-${index}`} className="overflow-hidden rounded-md border">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="whitespace-normal break-words">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">{shop.name}</h2>
                    <p>{shop.address}</p>
                    <p>Mon - Sat {shop.openingTimes["mon-sat"]}</p>
                    <p>Sun {shop.openingTimes["sun"]}</p>
                  </div>
                </TableCell>
                <TableCell className="align-middle">
                  <div className="flex justify-end">
                    <MapContainer className="w-full max-w-[500px]" center={shop.coordinates} zoom={13} scrollWheelZoom={false} style={{ height: '240px', width: '500px' }}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={shop.coordinates}>
                        <Popup>{shop.name}</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  )
}

export default Shops