import type { RoleKey } from "../types";
import type { RBACState } from "./rbacState";

let state: RBACState = {
  initialized: false,
  roles: [],
  effectiveCapabilities: [],
  loading: false,
  error: null,
};

export function getRBACState(): RBACState {
  return state;
}

export function setRBACState(
  next: RBACState,
): void {
  state = next;
}

export function setRBACRoles(
  roles: RoleKey[],
): void {
  state = {
    ...state,
    roles,
  };
}
