import {
  getWorkspaceState,
} from "../../../application/workspace/state/workspaceStore";

export function getPropertiesWorkspaceState() {
  const state =
    getWorkspaceState();

  return {
    domain:
      "properties",

    selected:
      state.selectedDomain ===
      "properties",

    resourceId:
      state.selectedResourceId,
  };
}
