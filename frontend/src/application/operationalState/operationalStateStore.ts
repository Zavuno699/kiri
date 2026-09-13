import type {
  UnifiedOperationalState,
} from "./unifiedOperationalState";

let state: UnifiedOperationalState | null = null;

export function getUnifiedOperationalState(): UnifiedOperationalState | null {
  return state;
}

export function setUnifiedOperationalState(
  next: UnifiedOperationalState,
): void {
  state = next;
}
