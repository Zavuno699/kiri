import {
  updateWorkspaceState,
} from "../state/workspaceStore";

import {
  setWorkspaceSelection,
} from "../state/workspaceSelectionStore";

export function selectWorkspaceDomain(
  domain: string,
): void {
  updateWorkspaceState({
    selectedDomain:
      domain,
    selectedResourceId:
      null,
  });

  setWorkspaceSelection({
    domain,
    resourceId:
      null,
    propertyId:
      null,
    leaseId:
      null,
    paymentId:
      null,
    deviceId:
      null,
    lockId:
      null,
  });
}
