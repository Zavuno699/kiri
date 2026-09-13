import {
  createRealizationContext,
} from "../../../application/realization/realizationContext"
import {
  readOnlyPolicy,
} from "../../../application/realization/realizationPolicy"

export function createLeaseRealization(
  leaseId?: string,
) {
  return {
    context: createRealizationContext(
      "lease",
      leaseId,
    ),
    policy: readOnlyPolicy(),
  }
}
