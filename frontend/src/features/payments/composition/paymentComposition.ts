import type { DomainModule } from "../../../application/composition/domainModule"
import { paymentModule } from "./paymentModule"

export interface PaymentComposition {
  module: DomainModule
  initialized: boolean
}

export function createPaymentComposition(): PaymentComposition {
  return {
    module: paymentModule,
    initialized: false,
  }
}
