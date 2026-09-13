export interface VerifiedCapability {
  verified: boolean
  reason?: string
}

export function assertVerifiedCapability(
  capability: VerifiedCapability,
): void {
  if (!capability.verified) {
    throw new Error(
      capability.reason ??
      "Capability is not verified.",
    )
  }
}
