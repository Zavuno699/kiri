export interface LockLeasePolicyInput {
  leaseActive: boolean
  paymentCurrent: boolean
  securityAllowed: boolean
}

export function mayIssueLockCommand(
  value: LockLeasePolicyInput,
): boolean {
  return (
    value.leaseActive &&
    value.paymentCurrent &&
    value.securityAllowed
  )
}
