import type { DomainHealthState } from "./domainHealthState";

let state: DomainHealthState = {
  initialized: false,
  domains: [],
  overall: "unknown",
  score: 0,
};

export function getDomainHealthState(): DomainHealthState {
  return state;
}

export function setDomainHealthState(
  next: DomainHealthState,
): void {
  state = next;
}
