import type { ControlPlaneState } from "./controlPlaneState"

export interface ControlPlane {
  state(): ControlPlaneState
}

export function createControlPlane(
  readState: () => ControlPlaneState,
): ControlPlane {
  return {
    state: readState,
  }
}
