import {
  getSecurityPrincipal,
} from "../state/securityPrincipalStore";

export function isPrincipalActive(): boolean {
  return (
    getSecurityPrincipal()
      ?.active === true
  );
}
