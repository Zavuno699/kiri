import type { DegradedMode } from "../degradedModeTypes";
import {
  getDegradedModeState,
  setDegradedModeState,
} from "../state/degradedModeStore";

export function enterDegradedMode(
  mode: DegradedMode,
  reason: string,
): void {
  const current = getDegradedModeState();

  setDegradedModeState({
    ...current,
    mode,
    reason,
    enteredAt: new Date().toISOString(),
  });
}
