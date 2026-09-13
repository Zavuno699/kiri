import type {
  SecurityFreezeState,
} from "../contracts/securityFreezeState";

let state: SecurityFreezeState = {
  frozen: false,
  initiatedAt: null,
  initiatedBy: null,
  reason: null,
  credentialRevocationRequired: false,
  recoveryRequired: false,
};

export function getSecurityFreezeState(): SecurityFreezeState {
  return state;
}

export function setSecurityFreezeState(
  next: SecurityFreezeState,
): void {
  state = next;
}
