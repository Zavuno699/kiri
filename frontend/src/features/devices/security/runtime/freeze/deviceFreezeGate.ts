import { getSecurityRuntimeState } from "../../../../application/security/runtime/securityRuntimeStore";

export function deviceOperationsFrozen(): boolean {
  return getSecurityRuntimeState().frozen;
}
