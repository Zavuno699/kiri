
import type { SecurityContextValue } from "./securityContext";
import { getSecurityRuntimeState } from "../runtime/securityRuntimeStore";

export function createSecurityContext(): SecurityContextValue {
  const state = getSecurityRuntimeState();

  return {
    identity: {
      identity: state.identity.principal ? {
        id: state.identity.principal,
        displayName: state.identity.principal,
        principal: state.identity.principal,
        tenantId: state.identity.tenantId ?? undefined,
        organizationId: undefined,
        authenticated: state.identity.authenticated,
        active: state.identity.authenticated,
      } : null,
      authenticated: state.identity.authenticated,
      principal: state.identity.principal,
      tenantId: state.identity.tenantId,
      organizationId: null,
    },
    session: state.session.session ? {
      id: state.session.session.id,
      state: "active",
      startedAt: null,
      lastActivityAt: null,
      expiresAt: null,
      idleTimeoutSeconds: null,
      authenticatedAt: null,
      revokedAt: null,
    } : null,
    permissions: state.permissions ? {
      granted: state.permissions as any,
      denied: [],
    } : null,
    frozen: state.frozen,
  };
}

