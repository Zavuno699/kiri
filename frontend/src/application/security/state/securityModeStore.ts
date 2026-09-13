import type {
  SecurityMode,
} from "../contracts/securityMode";

let mode: SecurityMode = "normal";

export function getSecurityMode(): SecurityMode {
  return mode;
}

export function setSecurityMode(
  next: SecurityMode,
): void {
  mode = next;
}
