export type PropertyStatus =
  | "active"
  | "occupied"
  | "vacant"
  | "maintenance"
  | "unknown"

export interface PropertyRecord {
  id: string
  name: string
  address: string
  units: number
  occupiedUnits: number
  status: PropertyStatus
  activeLeaseCount: number
}

export interface PropertyDetail extends PropertyRecord {
  propertyType?: string
  createdAt?: string
  updatedAt?: string
}
