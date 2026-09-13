import type { WorkspaceDefinition } from "./workspaceDefinition"

export interface WorkspaceRegistry {
  register(workspace: WorkspaceDefinition): void
  get(id: string): WorkspaceDefinition | undefined
  all(): WorkspaceDefinition[]
}

export function createWorkspaceRegistry(): WorkspaceRegistry {
  const values = new Map<string, WorkspaceDefinition>()

  return {
    register(workspace) {
      values.set(workspace.id, workspace)
    },
    get(id) {
      return values.get(id)
    },
    all() {
      return [...values.values()]
    },
  }
}
