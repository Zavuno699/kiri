
import type { OperatorSession } from "./session";

export type SessionAction =
  | { type: "start"; session: OperatorSession }
  | { type: "touch"; at: string }
  | { type: "expire"; at: string }
  | { type: "revoke"; at: string }
  | { type: "sign_out"; at: string };

export function sessionReducer(
  state: OperatorSession | null,
  action: SessionAction,
): OperatorSession | null {
  if (!state) {
    return action.type === "start" ? action.session : null;
  }

  switch (action.type) {
    case "touch":
      return { ...state, lastActivityAt: action.at };
    case "expire":
      return { ...state, state: "expired", lastActivityAt: action.at };
    case "revoke":
      return { ...state, state: "revoked", revokedAt: action.at };
    case "sign_out":
      return { ...state, state: "signed_out", lastActivityAt: action.at };
    default:
      return state;
  }
}

