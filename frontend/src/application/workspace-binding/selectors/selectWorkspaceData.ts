import type { WorkspaceBinding } from "../core/workspaceBinding"

export function selectWorkspaceData<T>(
  binding: WorkspaceBinding<T>,
): T | undefined {
  return binding.data
}
