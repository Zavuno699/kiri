import {
  getSecurityPrincipal,
} from "../state/securityPrincipalStore";

export function principalHasCapability(
  capability: string,
): boolean {
  return (
    getSecurityPrincipal()
      ?.capabilities.includes(
        capability,
      ) === true
  );
}
