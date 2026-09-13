
import type { SessionState } from "../types";

export interface OperatorSession {
  id: string;
  state: SessionState;
  startedAt: string | null;
  lastActivityAt: string | null;
  expiresAt: string | null;
  idleTimeoutSeconds: number | null;
  authenticatedAt: string | null;
  revokedAt: string | null;
}

