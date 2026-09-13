
import type { AuthorizationResult } from "./authorizationDecision";

export interface AuthorizationState {
  lastDecision: AuthorizationResult | null;
  deniedCount: number;
  grantedCount: number;
}

