
import type { AuthorizationDecision } from "../types";

export interface AuthorizationResult {
  decision: AuthorizationDecision;
  allowed: boolean;
  reason: string;
  capability: string;
}

