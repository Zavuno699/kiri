import {
  initializeUnifiedRuntime,
} from "../orchestration/initializeUnifiedRuntime";

import {
  executeRuntimeOperation,
} from "./operations/executeRuntimeOperation";

import {
  getUnifiedRuntimeDiagnostics,
} from "../diagnostics/unifiedRuntimeDiagnostics";

import {
  listRuntimeOperations,
} from "./operations/runtimeOperationRegistry";

import {
  recordRuntimeAuditEvent,
} from "../audit/runtimeAuditStore";

export const runtimeControlFacade = {
  initialize:
    initializeUnifiedRuntime,

  execute(
    operation: Parameters<
      typeof executeRuntimeOperation
    >[0],
  ) {
    const result =
      executeRuntimeOperation(
        operation,
      );

    recordRuntimeAuditEvent({
      id:
        `${operation}:${Date.now()}`,
      operation,
      outcome:
        result.completed
          ? "completed"
          : result.accepted
            ? "accepted"
            : "rejected",
      occurredAt:
        result.executedAt,
      reason:
        result.reason,
    });

    return result;
  },

  diagnostics:
    getUnifiedRuntimeDiagnostics,

  operations:
    listRuntimeOperations,
};
