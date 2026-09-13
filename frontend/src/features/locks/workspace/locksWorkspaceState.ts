import {
  getWorkspaceState,
} from "../../../application/workspace/state/workspaceStore";

export function getLocksWorkspaceState() {
  const state =
    getWorkspaceState();

  return {
    domain:
      "locks",

    selected:
      state.selectedDomain ===
      "locks",

    resourceId:
      state.selectedResourceId,
  };
}
