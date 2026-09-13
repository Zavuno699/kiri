import {
  createRealizationContext,
} from "../../../application/realization/realizationContext"
import {
  readOnlyPolicy,
} from "../../../application/realization/realizationPolicy"

export function createPropertyRealization(
  propertyId?: string,
) {
  return {
    context: createRealizationContext(
      "property",
      propertyId,
    ),
    policy: readOnlyPolicy(),
  }
}
