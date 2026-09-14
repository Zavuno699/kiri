import type { WorkspaceBinding } from "../core/workspaceBinding"

export interface WorkspaceBindingRegistry {
  register<T>(
    binding: WorkspaceBinding<T>,
  ): void

  get<T>(
    id: string,
  ): WorkspaceBinding<T> | undefined

  list(domain?: string): WorkspaceBinding[]
}

export function createWorkspaceBindingRegistry():
  WorkspaceBindingRegistry {
  const values = new Map<
    string,
    WorkspaceBinding
  >()

  return {
    register(binding) {
      values.set(binding.id, binding)
    },

    get<T>(id: string) {
      return values.get(id) as WorkspaceBinding<T> | undefined
    },

    list(domain) {
      const all = [...values.values()]
      return domain
        ? all.filter(
            (item) => item.domain === domain,
          )
        : all
    },
  }
}
