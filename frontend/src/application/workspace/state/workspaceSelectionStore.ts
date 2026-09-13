import type {
  WorkspaceSelection,
} from "../contracts/workspaceSelection";

let selection:
  WorkspaceSelection = {
    domain: null,
    resourceId: null,
    propertyId: null,
    leaseId: null,
    deviceId: null,
    lockId: null,
    paymentId: null,
  };

export function getWorkspaceSelection(): WorkspaceSelection {
  return {
    ...selection,
  };
}

export function setWorkspaceSelection(
  next: WorkspaceSelection,
): void {
  selection = {
    ...next,
  };
}

export function clearWorkspaceSelection(): void {
  selection = {
    domain: null,
    resourceId: null,
    propertyId: null,
    leaseId: null,
    paymentId: null,
    deviceId: null,
    lockId: null,
  };
}
