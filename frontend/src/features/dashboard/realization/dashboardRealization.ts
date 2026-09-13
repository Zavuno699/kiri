import {
  createRealizationContext,
} from "../../../application/realization/realizationContext"
import type {
  RealizationPolicy,
} from "../../../application/realization/realizationPolicy"
import {
  readOnlyPolicy,
} from "../../../application/realization/realizationPolicy"

export function createDashboardRealization() {
  const context =
    createRealizationContext("dashboard")

  const policy: RealizationPolicy =
    readOnlyPolicy()

  return {
    context,
    policy,
  }
}
