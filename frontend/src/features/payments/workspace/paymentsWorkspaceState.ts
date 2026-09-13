import {
  getWorkspaceState,
} from "../../../application/workspace/state/workspaceStore";

export function getPaymentsWorkspaceState() {
  const state =
    getWorkspaceState();

  return {
    domain:
      "payments",

    selected:
      state.selectedDomain ===
      "payments",

    resourceId:
      state.selectedResourceId,
  };
}
