import {
  registerUnifiedRuntimeSubsystems,
} from "../registry/registerRuntimeSubsystems";

import {
  initializeGlobalOrchestration,
} from "../../globalOrchestration/globalOrchestrationRuntime";

import {
  initializeUnifiedRuntimeLifecycle,
} from "../lifecycle/unifiedRuntimeLifecycle";

export function startUnifiedRuntime(): void {
  registerUnifiedRuntimeSubsystems();
  initializeGlobalOrchestration();
  initializeUnifiedRuntimeLifecycle();
}

export function refreshUnifiedRuntime(): void {
  initializeGlobalOrchestration();
  initializeUnifiedRuntimeLifecycle();
}
