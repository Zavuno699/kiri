import type { AuditState } from "./auditState";

let state: AuditState = {
  initialized: false,
  events: [],
  loading: false,
  error: null,
  lastUpdatedAt: null,
};

export function getAuditState(): AuditState {
  return state;
}

export function setAuditState(
  next: AuditState,
): void {
  state = next;
}
