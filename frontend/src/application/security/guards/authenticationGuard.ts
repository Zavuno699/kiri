
import { getSecurityRuntimeState } from "../runtime/securityRuntimeStore";

export function authenticationAllowed(): boolean {
  return getSecurityRuntimeState().identity.authenticated;
}

