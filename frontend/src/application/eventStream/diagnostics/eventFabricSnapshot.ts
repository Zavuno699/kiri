import {
  getEventStreamDiagnostics,
} from "./eventStreamDiagnostics";

import {
  getEventStreamCoverage,
} from "./eventStreamCoverage";

export function getEventFabricSnapshot() {
  return {
    diagnostics:
      getEventStreamDiagnostics(),
    coverage:
      getEventStreamCoverage(),
    capturedAt:
      new Date().toISOString(),
  };
}
