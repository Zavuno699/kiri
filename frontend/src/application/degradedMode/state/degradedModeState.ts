import type { DegradedMode } from "../degradedModeTypes";

export interface DegradedModeState {
  mode: DegradedMode;
  reason: string | null;
  enteredAt: string | null;
  manual: boolean;
}
