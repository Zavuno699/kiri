import {
  createRealizationContext,
} from "../../../application/realization/realizationContext"
import {
  readOnlyPolicy,
} from "../../../application/realization/realizationPolicy"

export function createSecurityRealization(
  subjectId?: string,
) {
  return {
    context: createRealizationContext(
      "security",
      subjectId,
    ),
    policy: readOnlyPolicy(
      "Security ingress is not verified for production HTTP use.",
    ),
  }
}
