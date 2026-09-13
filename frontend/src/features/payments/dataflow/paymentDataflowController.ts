export interface PaymentDataflowController {
  start(): void
  stop(): void
}

export function createPaymentDataflowController():
  PaymentDataflowController {

  return {
    start() {
      running = true
    },

    stop() {
      running = false
    },
  }
}
