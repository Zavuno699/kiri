import { authorizeDangerousOperation } from "../../../../../application/security/runtime/authorization/runtimeDangerousAuthorization";

export function lockCommandGate(): boolean {
  return authorizeDangerousOperation("locks.command");
}
