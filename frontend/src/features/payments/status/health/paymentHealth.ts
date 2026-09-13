export interface PaymentHealth {
  healthy: boolean
  degraded: boolean
  reason?: string
}

export function healthyPayment():
  PaymentHealth {
  return {
    healthy: true,
    degraded: false,
  }
}
