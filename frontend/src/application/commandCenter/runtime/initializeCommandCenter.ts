import {
  registerCanonicalCommandCenterActions,
} from "../registry/registerCommandCenterActions";

import {
  updateCommandCenterState,
} from "../state/commandCenterStore";

export function initializeCommandCenter(): void {
  registerCanonicalCommandCenterActions();

  updateCommandCenterState({
    status:
      "operational",
  });
}
