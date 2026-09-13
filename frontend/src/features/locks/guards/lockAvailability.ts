export interface LockAvailability {
  available: boolean
  reason?: string
}

export function lockAvailable(): LockAvailability {
  return {
    available: true,
  }
}
