
import type { IdentityContext } from "./identityContext";
import type { OperatorIdentity } from "./operatorIdentity";

export function resolveIdentity(
  identity: OperatorIdentity | null | undefined,
): IdentityContext {
  if (!identity) {
    return {
      identity: null,
      authenticated: false,
      principal: null,
      tenantId: null,
      organizationId: null,
    };
  }

  return {
    identity,
    authenticated: identity.authenticated && identity.active,
    principal: identity.authenticated ? identity.principal : null,
    tenantId: identity.tenantId ?? null,
    organizationId: identity.organizationId ?? null,
  };
}

