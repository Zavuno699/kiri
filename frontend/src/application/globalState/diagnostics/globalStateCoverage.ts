import {
  listStateSlices,
} from "../registry/stateSliceRegistry";

import {
  listGlobalStateEffects,
} from "../effects/globalEffectRegistry";

export function getGlobalStateCoverage() {
  return {
    slices:
      listStateSlices().length,

    effects:
      listGlobalStateEffects().length,

    expectedSlices:
      7,

    sliceCoverage:
      listStateSlices().length /
      7,

    coordinated:
      listStateSlices().length ===
      7 &&
      listGlobalStateEffects()
        .length > 0,
  };
}
