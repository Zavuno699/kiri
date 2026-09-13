import {
  getRuntimeControlState,
  setRuntimeControlState,
} from "./runtimeControlStore";

export function markRuntimeStarted(): void {
  const now =
    new Date().toISOString();

  setRuntimeControlState({
    ...getRuntimeControlState(),
    started: true,
    startedAt: now,
    lastTransitionAt: now,
  });
}

export function markRuntimeOperational(): void {
  setRuntimeControlState({
    ...getRuntimeControlState(),
    started: true,
    operational: true,
    degraded: false,
    safeMode: false,
    lastTransitionAt:
      new Date().toISOString(),
  });
}

export function markRuntimeDegraded(
  reasons: string[],
): void {
  setRuntimeControlState({
    ...getRuntimeControlState(),
    started: true,
    operational: false,
    degraded: true,
    lastTransitionAt:
      new Date().toISOString(),
    reasons,
  });
}

export function enterRuntimeSafeMode(
  reasons: string[],
): void {
  setRuntimeControlState({
    ...getRuntimeControlState(),
    started: true,
    operational: false,
    degraded: true,
    safeMode: true,
    lastTransitionAt:
      new Date().toISOString(),
    reasons,
  });
}
