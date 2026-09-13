import {
  getSecurityPrincipal,
} from "../state/securityPrincipalStore";

export function principalHasRole(
  role: string,
): boolean {
  return (
    getSecurityPrincipal()
      ?.roles.includes(role) ===
    true
  );
}
