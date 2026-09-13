import {
  requireCapability,
} from "../../security/guards/requireCapability";

import {
  markRuntimeOperational,
} from "../../runtime/control/runtimeTransitions";

export function recoverCommandCenter(): void {
  requireCapability(
    "recovery.execute",
  );

  markRuntimeOperational();
}
