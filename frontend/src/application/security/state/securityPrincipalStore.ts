import type {
  SecurityPrincipal,
} from "../contracts/securityPrincipal";

let principal: SecurityPrincipal | null = null;

export function getSecurityPrincipal(): SecurityPrincipal | null {
  return principal;
}

export function setSecurityPrincipal(
  next: SecurityPrincipal | null,
): void {
  principal = next;
}

export function clearSecurityPrincipal(): void {
  principal = null;
}
