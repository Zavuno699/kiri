import { runtimeSessionActive } from "../runtimeSessionGuard";

export function protectedSessionAllowed(): boolean {
  return runtimeSessionActive();
}
