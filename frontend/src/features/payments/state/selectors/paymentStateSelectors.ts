import type { PaymentState } from "../paymentState"

export function paymentIsOperational(
  state: PaymentState,
): boolean {
  return state === "active"
}

export function paymentIsDegraded(
  state: PaymentState,
): boolean {
  return state === "degraded"
}

export function paymentIsBlocked(
  state: PaymentState,
): boolean {
  return state === "blocked"
}

export function paymentIsFailed(
  state: PaymentState,
): boolean {
  return state === "failed"
}
