import {
  registerCanonicalStateSlices,
} from "../registry/registerStateSlices";

import {
  registerCanonicalGlobalEffects,
} from "../effects/registerGlobalEffects";

import {
  applyGlobalAction,
} from "../reducers/applyGlobalAction";

import {
  updateGlobalState,
} from "../state/globalStateStore";

export function initializeGlobalState(): void {
  registerCanonicalStateSlices();
  registerCanonicalGlobalEffects();

  applyGlobalAction({
    type:
      "global.runtime.operational",
  });

  updateGlobalState({
    initialized:
      true,
  });
}
