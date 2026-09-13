import {
  setSecurityMode,
} from "../state/securityModeStore";

import type {
  SecurityMode,
} from "../contracts/securityMode";

export function transitionSecurityMode(
  mode: SecurityMode,
): void {
  setSecurityMode(mode);
}
