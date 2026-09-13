import { runtimeSessionActive } from "../runtimeSessionGuard";

export function mutationSessionAllowed(): boolean {
  return runtimeSessionActive();
}
