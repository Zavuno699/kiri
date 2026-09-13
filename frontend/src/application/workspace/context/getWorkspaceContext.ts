import { getWorkspaceState } from "../state/workspaceStore"

export function getWorkspaceContext() {
  return getWorkspaceState()
}
