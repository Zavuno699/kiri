import type { WorkspaceBinding } from "./workspaceBinding"

export interface WorkspaceBindingController<T = unknown> {
  state(): WorkspaceBinding<T>
  load(
    query?: unknown,
  ): Promise<WorkspaceBinding<T>>
  refresh(): Promise<WorkspaceBinding<T>>
}
