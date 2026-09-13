import {
  getWorkspaceState,
} from "../../../application/workspace/state/workspaceStore";

export function getSecurityWorkspaceState() {
  const state =
    getWorkspaceState();

  return {
    domain:
      "security",

    selected:
      state.selectedDomain ===
      "security",

    resourceId:
      state.selectedResourceId,
  };
}
