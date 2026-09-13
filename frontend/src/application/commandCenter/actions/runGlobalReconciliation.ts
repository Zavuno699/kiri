import {
  requireCapability,
} from "../../security/guards/requireCapability";

import {
  updateCommandCenterState,
} from "../state/commandCenterStore";

export function runGlobalReconciliation(): void {
  requireCapability(
    "runtime.control",
  );

  updateCommandCenterState({
    status:
      "operational",
  });
}
