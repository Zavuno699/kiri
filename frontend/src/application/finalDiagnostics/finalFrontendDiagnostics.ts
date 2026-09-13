import {
  getUnifiedRuntimeState,
} from "../unifiedRuntime/state/unifiedRuntimeStore";

import {
  getUnifiedOperationalState,
} from "../operationalState/operationalStateStore";

import {
  listRuntimeSubsystems,
} from "../unifiedRuntime/registry/unifiedRuntimeRegistry";

export function collectFinalFrontendDiagnostics() {
  const runtime =
    getUnifiedRuntimeState();

  const operational =
    getUnifiedOperationalState();

  const subsystems =
    listRuntimeSubsystems();

  return {
    runtime,
    operational,
    subsystemCount:
      subsystems.length,
    requiredSubsystemCount:
      subsystems.filter(
        (item) => item.required,
      ).length,
    activeSubsystemCount:
      subsystems.filter(
        (item) => item.active,
      ).length,
  };
}
