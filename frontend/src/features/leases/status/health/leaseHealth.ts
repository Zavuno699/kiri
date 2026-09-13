export interface LeaseHealth {
  healthy: boolean
  degraded: boolean
  reason?: string
}

export function healthyLease():
  LeaseHealth {
  return {
    healthy: true,
    degraded: false,
  }
}
