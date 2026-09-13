import {
  ObservableState,
} from "../../../application/state/observableState"

export interface PaymentRuntimeState {
  selectedPaymentId?: string
  reconciliationInFlight: boolean
  lastReconciliationAt?: string
  error?: string
}

export const paymentRuntime =
  new ObservableState<PaymentRuntimeState>(
    {
      reconciliationInFlight: false,
    },
  )
