
import type { SecurityRuntimeState } from "../runtime/securityRuntimeState";

export const selectAuthenticated = (
  state: SecurityRuntimeState,
): boolean => state.identity.authenticated;

export const selectPrincipal = (
  state: SecurityRuntimeState,
): string | null => state.identity.principal;

export const selectFrozen = (
  state: SecurityRuntimeState,
): boolean => state.frozen;

export const selectAuthorizationReady = (
  state: SecurityRuntimeState,
): boolean => state.authorizationReady;

