import {
  enterRuntimeSafeMode,
  markRuntimeOperational,
} from "./runtimeTransitions";

export function acknowledgeRuntimeDegradation(): void {
  markRuntimeOperational();
}

export function forceRuntimeSafeMode(
  reason: string,
): void {
  enterRuntimeSafeMode([
    reason,
  ]);
}
