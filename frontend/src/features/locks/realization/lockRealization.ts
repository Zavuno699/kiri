import {
  createRealizationContext,
} from "../../../application/realization/realizationContext"
import {
  readOnlyPolicy,
} from "../../../application/realization/realizationPolicy"

export function createLockRealization(
  lockId?: string,
) {
  return {
    context: createRealizationContext(
      "lock",
      lockId,
    ),
    policy: readOnlyPolicy(
      "Lock ingress is not verified for production HTTP use.",
    ),
  }
}
