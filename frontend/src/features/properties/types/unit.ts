export type UnitLifecycle = "available" | "occupied" | "maintenance" | "reserved"

export interface UnitRecord {
  id: string
  property_id: string
  unit_number: string
  unit_type: string
  floor_number: number
  square_feet: number
  bedrooms: number
  bathrooms: number
  lifecycle: UnitLifecycle
  description: string
  amenities: string[]
  created_at: string
  updated_at: string
}

export interface CreateUnitRequest {
  property_id: string
  unit_number: string
  unit_type?: string
  floor_number?: number
  square_feet?: number
  bedrooms?: number
  bathrooms?: number
  description?: string
  amenities?: string[]
}

export interface UpdateUnitRequest {
  unit_number: string
  unit_type?: string
  floor_number?: number
  square_feet?: number
  bedrooms?: number
  bathrooms?: number
  description?: string
  amenities?: string[]
}
