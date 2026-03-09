import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import type { Shop } from "@/models/Shop"
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

interface ShopsProps {
  shops: Shop[]
}

function Shops({ shops }: ShopsProps) {

  return (
    <div className="flex flex-col gap-4 pt-4">
      <h1 className="text-2xl font-semibold">Find us</h1>
      
      {shops.map((shop, index) => (
        <div key={`${shop.name}-${index}`} className="overflow-hidden rounded-md border">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="whitespace-normal break-words">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">{shop.name}</h2>
                    <p>{shop.street} {shop.buildingNumber}</p>
                    <p>{shop.city}, {shop.countryCode}</p>
                    <div>
                      <Button asChild>
                        <a
                          href={shop.googleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open in Google Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="align-middle">
                  <div className="flex justify-end">
                    <MapContainer
                      className="w-full max-w-[500px]"
                      center={[shop.addressLatitude, shop.addressLongitude]}
                      zoom={13}
                      scrollWheelZoom={false}
                      style={{ height: "240px", width: "500px" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[shop.addressLatitude, shop.addressLongitude]}>
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