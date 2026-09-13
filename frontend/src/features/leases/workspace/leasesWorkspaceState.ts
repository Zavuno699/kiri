import {
  getWorkspaceState,
} from "../../../application/workspace/state/workspaceStore";

export function getLeasesWorkspaceState() {
  const state =
    getWorkspaceState();

  return {
    domain:
      "leases",

    selected:
      state.selectedDomain ===
      "leases",

    resourceId:
      state.selectedResourceId,
  };
}
