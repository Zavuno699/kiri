export interface SecurityAvailability {
  available: boolean
  reason?: string
}

export function securityAvailable(): SecurityAvailability {
  return {
    available: true,
  }
}
