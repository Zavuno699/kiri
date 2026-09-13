export interface SecurityHealth {
  healthy: boolean
  degraded: boolean
  reason?: string
}

export function healthySecurity():
  SecurityHealth {
  return {
    healthy: true,
    degraded: false,
  }
}
