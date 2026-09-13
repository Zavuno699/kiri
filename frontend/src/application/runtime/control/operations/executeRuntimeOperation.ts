import type {
  RuntimeOperation,
} from "./runtimeOperation";

import {
  getRuntimeControlState,
} from "../runtimeControlStore";

import {
  markRuntimeOperational,
  enterRuntimeSafeMode,
} from "../runtimeTransitions";

export function executeRuntimeOperation(
  operation: RuntimeOperation,
): {
  operation: RuntimeOperation;
  accepted: boolean;
  completed: boolean;
  reason: string | null;
  executedAt: string;
} {
  const current =
    getRuntimeControlState();

  switch (operation) {
    case "start":
    case "recover":
      markRuntimeOperational();

      return {
        operation,
        accepted: true,
        completed: true,
        reason: null,
        executedAt:
          new Date().toISOString(),
      };

    case "safe-mode":
      enterRuntimeSafeMode([
        "operator-requested-safe-mode",
      ]);

      return {
        operation,
        accepted: true,
        completed: true,
        reason: null,
        executedAt:
          new Date().toISOString(),
      };

    case "stop":
      return {
        operation,
        accepted: true,
        completed: false,
        reason:
          "frontend-runtime-stop-is-controlled-by-host-lifecycle",
        executedAt:
          new Date().toISOString(),
      };

    case "refresh":
    case "reconcile":
    case "invalidate-cache":
    case "reconnect-realtime":
      return {
        operation,
        accepted:
          current.started,
        completed: false,
        reason:
          current.started
            ? "operation-delegated-to-runtime-subsystem"
            : "runtime-not-started",
        executedAt:
          new Date().toISOString(),
      };
  }
}
