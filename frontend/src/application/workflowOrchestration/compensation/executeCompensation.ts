import type {
  CompensationAction,
} from "../contracts/compensationAction";

import {
  executeCommand,
} from "../../commandQuery/runtime/executeCommand";

export function executeCompensation(
  action: CompensationAction,
  entityId: string | null,
  correlationId: string,
) {
  if (!action.enabled) {
    return {
      success:
        false,
      message:
        "Compensation action disabled.",
    };
  }

  const result =
    executeCommand({
      commandId:
        action.action,
      entityId,
      domain:
        action.domain,
      parameters:
        {
          compensation:
            true,
          reason:
            action.reason,
        },
      correlationId,
      requestedAt:
        new Date().toISOString(),
    });

  return {
    success:
      result.accepted,
    message:
      result.message,
  };
}
