import {
  ObservableState,
} from "../../../application/state/observableState"

export interface LeaseRuntimeState {
  selectedLeaseId?: string
  loadingEntitlement: boolean
  entitlementVerified: boolean
  error?: string
}

export const leaseRuntime =
  new ObservableState<LeaseRuntimeState>(
    {
      loadingEntitlement: false,
      entitlementVerified: false,
    },
  )
