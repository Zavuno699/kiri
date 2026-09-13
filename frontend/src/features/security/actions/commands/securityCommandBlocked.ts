export interface SecurityCommandBlocked {
  allowed: false
  reason: string
}

export const securityCommandBlocked:
  SecurityCommandBlocked = {
  allowed: false,
  reason:
    "Security production HTTP command ingress is not verified.",
}
