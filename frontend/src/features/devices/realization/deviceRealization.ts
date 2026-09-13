import {
  createRealizationContext,
} from "../../../application/realization/realizationContext"
import {
  readOnlyPolicy,
} from "../../../application/realization/realizationPolicy"

export function createDeviceRealization(
  deviceId?: string,
) {
  return {
    context: createRealizationContext(
      "device",
      deviceId,
    ),
    policy: readOnlyPolicy(
      "Device commands require verified production ingress and authorization.",
    ),
  }
}
