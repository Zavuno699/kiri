import type { IntegrityState } from "./integrityState";

let state: IntegrityState = {
  initialized: false,
  checks: [],
  pass: 0,
  warn: 0,
  fail: 0,
  overall: "unknown",
};

export function getIntegrityState(): IntegrityState {
  return state;
}

export function setIntegrityState(
  next: IntegrityState,
): void {
  state = next;
}
