
import type { SecurityContextValue } from "./securityContext";
import { getSecurityRuntimeState } from "../runtime/securityRuntimeStore";

export function createSecurityContext(): SecurityContextValue {
  const state = getSecurityRuntimeState();

  return {
    identity: state.identity,
    session: state.session.session,
    permissions: state.permissions,
    frozen: state.frozen,
  };
}

