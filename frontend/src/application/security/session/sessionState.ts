
import type { OperatorSession } from "./session";

export interface SessionStateModel {
  session: OperatorSession | null;
  initialized: boolean;
  requiresAuthentication: boolean;
}

