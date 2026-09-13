import {
  getRuntimeControlState,
} from "../control/runtimeControlStore";

import {
  listRuntimeSubsystemStates,
} from "../state/runtimeSubsystemStore";

export function getUnifiedRuntimeDiagnostics() {
  const subsystems =
    listRuntimeSubsystemStates();

  return {
    control:
      getRuntimeControlState(),

    subsystems,

    readySubsystemCount:
      subsystems.filter(
        (item) => item.ready,
      ).length,

    degradedSubsystemCount:
      subsystems.filter(
        (item) => item.degraded,
      ).length,

    operational:
      getRuntimeControlState()
        .operational,

    safeMode:
      getRuntimeControlState()
        .safeMode,
  };
}
