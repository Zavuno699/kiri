import {
  getSecurityMode,
} from "../state/securityModeStore";

import {
  getSecurityFreezeState,
} from "../state/securityFreezeStore";

import {
  failClosed,
} from "./failClosed";

export function requireSafeOperation(): void {
  if (
    getSecurityMode() ===
      "frozen" ||
    getSecurityMode() ===
      "safe"
  ) {
    failClosed(
      "security-safe-mode-active",
    );
  }

  if (
    getSecurityFreezeState().frozen
  ) {
    failClosed(
      "security-freeze-active",
    );
  }
}
