import {
  createRealizationContext,
} from "../../../application/realization/realizationContext"
import {
  readOnlyPolicy,
} from "../../../application/realization/realizationPolicy"

export function createPaymentRealization(
  paymentId?: string,
) {
  return {
    context: createRealizationContext(
      "payment",
      paymentId,
    ),
    policy: readOnlyPolicy(),
  }
}
