import type {
  RuntimeSubsystem,
} from "../contracts/runtimeSubsystem";

import {
  updateRuntimeSubsystem,
} from "../state/runtimeSubsystemStore";

export function markSubsystemReady(
  subsystem: RuntimeSubsystem,
): void {
  updateRuntimeSubsystem(
    subsystem,
    {
      initialized: true,
      ready: true,
      degraded: false,
      initializedAt:
        new Date().toISOString(),
      reason: null,
    },
  );
}

export function markSubsystemDegraded(
  subsystem: RuntimeSubsystem,
  reason: string,
): void {
  updateRuntimeSubsystem(
    subsystem,
    {
      initialized: true,
      ready: false,
      degraded: true,
      initializedAt:
        new Date().toISOString(),
      reason,
    },
  );
}
