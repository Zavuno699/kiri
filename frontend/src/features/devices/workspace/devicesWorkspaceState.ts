import {
  getWorkspaceState,
} from "../../../application/workspace/state/workspaceStore";

export function getDevicesWorkspaceState() {
  const state =
    getWorkspaceState();

  return {
    domain:
      "devices",

    selected:
      state.selectedDomain ===
      "devices",

    resourceId:
      state.selectedResourceId,
  };
}
