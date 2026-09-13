import {
  getWorkspaceContext,
} from "../getWorkspaceContext";

export function getLeaseDeviceChain() {
  const context =
    getWorkspaceContext();

  return {
    leaseId:
      context.leaseId,
    deviceId:
      context.deviceId,
  };
}
