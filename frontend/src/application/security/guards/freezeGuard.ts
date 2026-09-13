
import { getSecurityRuntimeState } from "../runtime/securityRuntimeStore";

export function operationsFrozen(): boolean {
  return getSecurityRuntimeState().frozen;
}

