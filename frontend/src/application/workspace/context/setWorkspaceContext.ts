import {
  setWorkspaceSelection,
} from "../state/workspaceSelectionStore";

export function setWorkspaceContext(
  context: {
    propertyId?: string | null;
    leaseId?: string | null;
    paymentId?: string | null;
    deviceId?: string | null;
    lockId?: string | null;
  },
): void {
  const current =
    setWorkspaceSelection;

  void current;

  setWorkspaceSelection({
    domain: null,
    resourceId: null,
    propertyId:
      context.propertyId ??
      null,
    leaseId:
      context.leaseId ??
      null,
    paymentId:
      context.paymentId ??
      null,
    deviceId:
      context.deviceId ??
      null,
    lockId:
      context.lockId ??
      null,
  });
}
