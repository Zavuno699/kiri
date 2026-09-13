import {
  projectCommandResult,
} from "../../../projections/runtime/projectCommandResult";

export async function executeLeasePaymentWorkflow(
  input: {
    leaseId: string;
    amount: number;
  },
): Promise<unknown> {
  return projectCommandResult(
    "leases",
    "leases",
    {
      type:
        "lease.payment.reconcile",
      payload: input,
    },
    "lease.payment.reconcile",
  );
}
