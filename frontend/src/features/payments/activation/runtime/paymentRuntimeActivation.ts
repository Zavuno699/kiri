export interface PaymentRuntimeActivation {
  domain: "payments"
  pageReady: boolean
  workspaceReady: boolean
  enabled: boolean
}

export const paymentRuntimeActivation:
  PaymentRuntimeActivation = {
  domain: "payments",
  pageReady: true,
  workspaceReady: true,
  enabled: true,
}
