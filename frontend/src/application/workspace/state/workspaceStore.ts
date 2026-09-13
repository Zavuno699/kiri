import {
  initialWorkspaceState,
  type WorkspaceState,
} from "./workspaceState"

let state: WorkspaceState = { ...initialWorkspaceState }

export function getWorkspaceState(): WorkspaceState {
  return { ...state }
}

export function updateWorkspaceState(
  patch: Partial<WorkspaceState>,
): WorkspaceState {
  state = {
    ...state,
    ...patch,
  }
  return getWorkspaceState()
}

export function resetWorkspaceState(): WorkspaceState {
  state = { ...initialWorkspaceState }
  return getWorkspaceState()
}
