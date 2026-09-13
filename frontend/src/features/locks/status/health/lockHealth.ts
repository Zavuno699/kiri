export interface LockHealth {
  healthy: boolean
  degraded: boolean
  reason?: string
}

export function healthyLock():
  LockHealth {
  return {
    healthy: true,
    degraded: false,
  }
}
