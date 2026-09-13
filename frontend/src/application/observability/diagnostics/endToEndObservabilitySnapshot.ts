import {
  getObservabilityDiagnostics,
} from "./observabilityDiagnostics";

import {
  resolveEndToEndTrace,
} from "../runtime/resolveEndToEndTrace";

export function getEndToEndObservabilitySnapshot(
  correlationId: string,
) {
  return {
    trace:
      resolveEndToEndTrace(
        correlationId,
      ),
    diagnostics:
      getObservabilityDiagnostics(),
    capturedAt:
      new Date().toISOString(),
  };
}
