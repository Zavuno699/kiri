import {
  getPaymentsAccessState,
} from "./paymentsAccessState"

export function canReadPayments(): boolean {
  return getPaymentsAccessState().readable
}

export function canWritePayments(): boolean {
  return getPaymentsAccessState().writable
}
