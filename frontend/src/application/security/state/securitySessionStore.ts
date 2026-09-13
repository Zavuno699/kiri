import type {
  SecuritySession,
} from "../contracts/securitySession";

let session: SecuritySession | null = null;

export function getSecuritySession(): SecuritySession | null {
  return session;
}

export function setSecuritySession(
  next: SecuritySession | null,
): void {
  session = next;
}

export function clearSecuritySession(): void {
  session = null;
}
