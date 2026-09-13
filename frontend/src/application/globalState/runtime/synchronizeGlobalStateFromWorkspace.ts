import {
  getWorkspaceState,
} from "../../workspace/state/workspaceStore";

import {
  updateGlobalState,
} from "../state/globalStateStore";

export function synchronizeGlobalStateFromWorkspace(): void {
  const workspace =
    getWorkspaceState();

  updateGlobalState({
    activeDomain:
      workspace.selectedDomain,
    selectedResourceId:
      workspace.selectedResourceId,
  });
}
