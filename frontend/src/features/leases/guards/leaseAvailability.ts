export interface LeaseAvailability {
  available: boolean
  reason?: string
}

export function leaseAvailable(): LeaseAvailability {
  return {
    available: true,
  }
}
