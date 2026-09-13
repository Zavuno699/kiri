import type { WorkspaceBinding } from "../core/workspaceBinding"

export function selectWorkspaceLoading(
  binding: WorkspaceBinding,
): boolean {
  return binding.loading || binding.refreshing
}
