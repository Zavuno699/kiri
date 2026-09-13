import {
  getUnifiedRuntimeState,
} from "../state/unifiedRuntimeStore";

import {
  listRuntimeSubsystems,
} from "../registry/unifiedRuntimeRegistry";

export function collectUnifiedRuntimeDiagnostics() {
  const state =
    getUnifiedRuntimeState();

  const subsystems =
    listRuntimeSubsystems();

  return {
    status: state.status,
    operatorReady:
      state.operatorReady,
    degradedMode:
      state.degradedMode,
    consistencyScore:
      state.consistencyScore,
    domainHealthScore:
      state.domainHealthScore,
    requiredSubsystems:
      subsystems.filter(
        (item) => item.required,
      ),
    reasons:
      state.reasons,
  };
}
