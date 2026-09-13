import {
  getWorkspaceContext,
} from "../getWorkspaceContext";

export function getLeasePaymentChain() {
  const context =
    getWorkspaceContext();

  return {
    leaseId:
      context.leaseId,
    paymentId:
      context.paymentId,
  };
}
