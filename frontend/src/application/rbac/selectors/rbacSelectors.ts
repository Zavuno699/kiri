import type { RBACState } from "../state/rbacState";

export const selectRBACReady = (
  state: RBACState,
): boolean =>
  state.initialized &&
  !state.loading &&
  state.error === null;

export const selectRBACRoles = (
  state: RBACState,
) => state.roles;

export const selectEffectiveCapabilities = (
  state: RBACState,
) => state.effectiveCapabilities;
