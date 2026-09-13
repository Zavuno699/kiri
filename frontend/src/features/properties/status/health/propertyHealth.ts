export interface PropertyHealth {
  healthy: boolean
  degraded: boolean
  reason?: string
}

export function healthyProperty():
  PropertyHealth {
  return {
    healthy: true,
    degraded: false,
  }
}
