import {
  projectCommandResult,
} from "../../../projections/runtime/projectCommandResult";

export async function executeLeaseLockWorkflow(
  input: {
    leaseId: string;
    lockId: string;
  },
): Promise<unknown> {
  return projectCommandResult(
    "locks",
    "locks",
    {
      type:
        "lease.lock.authorize",
      payload: input,
    },
    "lease.lock.authorize",
  );
}
