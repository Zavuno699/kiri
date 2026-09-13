import {
  refreshUnifiedRuntime,
} from "../../unifiedRuntime/runtime/unifiedRuntimeOrchestrator";

import {
  rebuildUnifiedOperationalState,
} from "../buildOperationalState";

export function refreshUnifiedOperationalState(): void {
  refreshUnifiedRuntime();
  rebuildUnifiedOperationalState();
}
