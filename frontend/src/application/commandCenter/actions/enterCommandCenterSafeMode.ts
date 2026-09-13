import {
  requireCapability,
} from "../../security/guards/requireCapability";

import {
  enterRuntimeSafeMode,
} from "../../runtime/control/runtimeTransitions";

export function enterCommandCenterSafeMode(
  reason =
    "operator-command-center-request",
): void {
  requireCapability(
    "runtime.control",
  );

  enterRuntimeSafeMode([
    reason,
  ]);
}
