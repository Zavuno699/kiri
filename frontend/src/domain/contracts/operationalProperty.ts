export interface OperationalProperty {
  id: string
  name: string
  status?: string
  occupancy?: number
  availableUnits?: number
  totalUnits?: number
  address?: string
  currency?: string
  metadata?: Record<string, unknown>
}
