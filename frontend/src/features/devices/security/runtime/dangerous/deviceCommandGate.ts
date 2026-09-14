import { authorizeDangerousOperation } from "../../../../../application/security/runtime/authorization/runtimeDangerousAuthorization";

export function deviceCommandGate(): boolean {
  return authorizeDangerousOperation("devices.command");
}
