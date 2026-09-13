import {
  getWorkspaceState,
} from "../../../application/workspace/state/workspaceStore";

export function getDashboardWorkspaceState() {
  const state =
    getWorkspaceState();

  return {
    domain:
      "dashboard",

    selected:
      state.selectedDomain ===
      "dashboard",

    resourceId:
      state.selectedResourceId,
  };
}
