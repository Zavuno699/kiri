import {
  getSecurityMode,
} from "../state/securityModeStore";

import {
  isPrincipalActive,
} from "../principal/isPrincipalActive";

import {
  isSecuritySessionActive,
} from "../session/isSessionActive";

import {
  failClosed,
} from "./failClosed";

export function requireActiveSecurity(): void {
  if (
    getSecurityMode() ===
    "frozen"
  ) {
    failClosed(
      "security-mode-frozen",
    );
  }

  if (!isPrincipalActive()) {
    failClosed(
      "principal-inactive",
    );
  }

  if (!isSecuritySessionActive()) {
    failClosed(
      "session-inactive",
    );
  }
}
