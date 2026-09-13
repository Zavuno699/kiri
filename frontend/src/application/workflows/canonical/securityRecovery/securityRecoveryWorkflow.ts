import {
  projectCommandResult,
} from "../../../projections/runtime/projectCommandResult";

export async function executeSecurityRecoveryWorkflow(
  input: {
    operatorId: string;
    reason: string;
  },
): Promise<unknown> {
  return projectCommandResult(
    "security",
    "security",
    {
      type:
        "security.recovery.execute",
      payload: input,
    },
    "security.recovery.execute",
  );
}
