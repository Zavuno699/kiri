import { getWorkspaceState } from "../state/workspaceStore"
import { listWorkspaceDomains } from "../registry/workspaceDomainRegistry"
import { listWorkspaceQueueItems } from "../queues/workspaceQueueStore"

export interface WorkspaceDiagnostics {
  state: ReturnType<typeof getWorkspaceState>
  activeDomain: string | null
  domainCount: number
  queueCount: number
  searchResultCount: number
  operational: boolean
}

export function getWorkspaceDiagnostics(): WorkspaceDiagnostics {
  const state = getWorkspaceState()

  return {
    state,
    activeDomain: state.selectedDomain,
    domainCount: listWorkspaceDomains().length,
    queueCount: listWorkspaceQueueItems().length,
    searchResultCount: 0,
    operational: state.workspaceStatus !== "failed",
  }
}
