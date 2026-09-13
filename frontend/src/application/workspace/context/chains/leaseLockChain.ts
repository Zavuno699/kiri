import {
  getWorkspaceContext,
} from "../getWorkspaceContext";

export function getLeaseLockChain() {
  const context =
    getWorkspaceContext();

  return {
    leaseId:
      context.leaseId,
    lockId:
      context.lockId,
  };
}
