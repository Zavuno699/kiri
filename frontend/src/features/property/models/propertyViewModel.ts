export interface PropertyViewModel {
  id: string
  name: string
  status: string
  occupancy: string
  units: number
  occupiedUnits: number
  availableUnits: number
  occupancyPercent: number
}

export function buildPropertyViewModel(
  property: {
    id: string
    name: string
    status: string
    occupancy?: string
    units?: number
    occupiedUnits?: number
    availableUnits?: number
  },
): PropertyViewModel {
  const units = property.units ?? 0
  const occupied = property.occupiedUnits ?? 0

  return {
    id: property.id,
    name: property.name,
    status: property.status,
    occupancy:
      property.occupancy ?? "unknown",
    units,
    occupiedUnits: occupied,
    availableUnits:
      property.availableUnits ?? 0,
    occupancyPercent:
      units > 0
        ? Math.round((occupied / units) * 100)
        : 0,
  }
}
