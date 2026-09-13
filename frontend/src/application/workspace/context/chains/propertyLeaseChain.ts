import {
  getWorkspaceContext,
} from "../getWorkspaceContext";

export function getPropertyLeaseChain() {
  const context =
    getWorkspaceContext();

  return {
    propertyId:
      context.propertyId,
    leaseId:
      context.leaseId,
  };
}
