import {
  getWorkspaceDiagnostics,
} from "./workspaceDiagnostics";

export function getWorkspaceSnapshot() {
  const diagnostics =
    getWorkspaceDiagnostics();

  return {
    operatorId:
      diagnostics.state.operatorId,

    selectedDomain:
      diagnostics.activeDomain,

    selectedResourceId:
      diagnostics.state.selectedResourceId,

    commandMode:
      diagnostics.state.commandMode,

    status:
      diagnostics.state.workspaceStatus,

    domains:
      diagnostics.domainCount,

    queueItems:
      diagnostics.queueCount,

    searchResults:
      diagnostics.searchResultCount,

    operational:
      diagnostics.operational,
  };
}
