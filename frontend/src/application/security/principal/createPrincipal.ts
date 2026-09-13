import type {
  SecurityPrincipal,
} from "../contracts/securityPrincipal";

export function createSecurityPrincipal(
  id: string,
  roles: string[],
  capabilities: string[],
): SecurityPrincipal {
  return {
    id,
    type: "operator",
    active: true,
    roles: [
      ...roles,
    ],
    capabilities: [
      ...capabilities,
    ],
  };
}
