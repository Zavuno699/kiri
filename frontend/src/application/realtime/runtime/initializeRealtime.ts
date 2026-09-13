import {
  registerCanonicalRealtime,
} from "../registry/registerCanonicalRealtime";

import {
  registerCanonicalRealtimeRefreshRules,
} from "../refresh/registerRealtimeRefreshRules";

export function initializeRealtimeRuntime(): void {
  registerCanonicalRealtime();
  registerCanonicalRealtimeRefreshRules();
}
