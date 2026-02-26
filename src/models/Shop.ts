import type { LatLngExpression } from "leaflet"

export type Shop = {
  id: string;
  name: string;
  street: string;
  buildingNumber: string;
  countryCode: string;
  city: string;
  addressLatitude: number;
  addressLongitude: number;
}