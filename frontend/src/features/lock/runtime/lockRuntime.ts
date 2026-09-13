import {
  ObservableState,
} from "../../../application/state/observableState"

export interface LockRuntimeState {
  selectedLockId?: string
  commandInFlight: boolean
  commandState:
    | "idle"
    | "submitted"
    | "accepted"
    | "rejected"
    | "failed"
  error?: string
}

export const lockRuntime =
  new ObservableState<LockRuntimeState>(
    {
      commandInFlight: false,
      commandState: "idle",
    },
  )
