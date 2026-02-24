import type { LatLngExpression } from "leaflet"

export type Shop = {
  name: string,
  address: string,
  coordinates: LatLngExpression,
  openingTimes: { "mon-sat": string; "sun": string; }
}