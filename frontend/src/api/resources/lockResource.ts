export interface LockHttpBoundary {
  readonly verified: false
  readonly reason: string
}

export const lockHttpBoundary: LockHttpBoundary = {
  verified: false,
  reason:
    "Lock HTTP ingress has not been verified against the production backend.",
}
