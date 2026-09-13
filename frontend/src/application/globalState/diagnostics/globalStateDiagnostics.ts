import {
  getGlobalState,
} from "../state/globalStateStore";

import {
  listStateSlices,
} from "../registry/stateSliceRegistry";

import {
  listGlobalStateEvents,
} from "../events/globalStateEventStore";

import {
  listGlobalStateEffects,
} from "../effects/globalEffectRegistry";

export function getGlobalStateDiagnostics() {
  return {
    state:
      getGlobalState(),

    sliceCount:
      listStateSlices().length,

    eventCount:
      listGlobalStateEvents()
        .length,

    effectCount:
      listGlobalStateEffects()
        .length,

    slices:
      listStateSlices(),

    effects:
      listGlobalStateEffects(),

    recentEvents:
      listGlobalStateEvents()
        .slice(-25),
  };
}
