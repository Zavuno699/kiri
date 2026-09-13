export interface PropertyAvailability {
  available: boolean
  reason?: string
}

export function propertyAvailable(): PropertyAvailability {
  return {
    available: true,
  }
}
