import {
  getWorkspaceContext,
} from "../getWorkspaceContext";

export function getDeviceLockChain() {
  const context =
    getWorkspaceContext();

  return {
    deviceId:
      context.deviceId,
    lockId:
      context.lockId,
  };
}
