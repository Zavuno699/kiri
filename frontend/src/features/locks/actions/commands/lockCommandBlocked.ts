export interface LockCommandBlocked {
  allowed: false
  reason: string
}

export const lockCommandBlocked:
  LockCommandBlocked = {
  allowed: false,
  reason:
    "Lock production HTTP command ingress is not verified.",
}
