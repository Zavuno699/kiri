import { sessionExpired } from "../../session/sessionExpiry";
import { getSecurityRuntimeState } from "../securityRuntimeStore";

export function runtimeSessionActive(): boolean {
  const state = getSecurityRuntimeState();
  const session = state.session.session;

  if (!session) {
    return false;
  }

  return !sessionExpired(session);
}
