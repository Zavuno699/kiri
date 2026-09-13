import { getSecurityRuntimeState } from "../../../../application/security/runtime/securityRuntimeStore";

export function lockOperationsFrozen(): boolean {
  return getSecurityRuntimeState().frozen;
}
