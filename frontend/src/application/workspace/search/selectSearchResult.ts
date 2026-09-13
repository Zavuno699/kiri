import {
  updateWorkspaceState,
} from "../state/workspaceStore";

import {
  setWorkspaceSelection,
} from "../state/workspaceSelectionStore";

import type {
  WorkspaceSearchResult,
} from "../contracts/workspaceSearchResult";

export function selectWorkspaceSearchResult(
  result: WorkspaceSearchResult,
): void {
  updateWorkspaceState({
    selectedDomain:
      result.domain,
    selectedResourceId:
      result.id,
  });

  setWorkspaceSelection({
    domain:
      result.domain,
    resourceId:
      result.id,
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
