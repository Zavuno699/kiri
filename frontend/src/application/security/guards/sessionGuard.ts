
import { getSecurityRuntimeState } from "../runtime/securityRuntimeStore";

export function sessionAllowed(): boolean {
  return (
    getSecurityRuntimeState().session.requiresAuthentication === false &&
    getSecurityRuntimeState().session.session !== null
  );
}

