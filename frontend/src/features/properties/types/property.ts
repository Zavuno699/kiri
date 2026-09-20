export type PropertyStatus =
  | "active"
  | "inactive"
  | "pending_activation"

export interface PropertyRecord {
  id: string
  landlord_profile_id: string
  property_name: string
  property_type: string
  address_line1: string
  address_line2: string
  city: string
  state: string
  postal_code: string
  country: string
  timezone: string
  status: PropertyStatus
  total_units: number
  description: string
  created_at: string
  updated_at: string
}

export interface CreatePropertyRequest {
  property_name: string
  property_type?: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country?: string
  timezone?: string
  description?: string
}

export interface UpdatePropertyRequest {
  property_name: string
  property_type?: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country?: string
  timezone?: string
  description?: string
}
