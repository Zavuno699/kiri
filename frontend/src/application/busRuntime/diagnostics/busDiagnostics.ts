import {
  listBuses,
} from "../registry/busRegistry";

import {
  getBusRuntimeState,
} from "../state/busRuntimeStore";

export function getBusDiagnostics() {
  return {
    runtime:
      getBusRuntimeState(),
    buses:
      listBuses(),
  };
}
