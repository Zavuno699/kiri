import type { ReconciliationInput } from "../contracts/reconciliationInput";
import type { ReconciliationResult } from "../contracts/reconciliationResult";

export function reconcileValue<T>(
  input: ReconciliationInput<T>,
): ReconciliationResult<T> {
  if (!input.authoritative) {
    return {
      status: "missing",
      local: input.local,
      authoritative: null,
      conflicts: ["authoritative-state-missing"],
      stale: true,
      recoverable: false,
    };
  }

  if (!input.local) {
    return {
      status: "drifted",
      local: null,
      authoritative: input.authoritative,
      conflicts: ["local-state-missing"],
      stale: false,
      recoverable: true,
    };
  }

  if (
    input.version !== null &&
    input.version !== undefined &&
    input.authoritativeVersion !== null &&
    input.authoritativeVersion !== undefined &&
    input.version < input.authoritativeVersion
  ) {
    return {
      status: "stale",
      local: input.local,
      authoritative: input.authoritative,
      conflicts: ["local-version-behind"],
      stale: true,
      recoverable: true,
    };
  }

  if (
    JSON.stringify(input.local) !==
    JSON.stringify(input.authoritative)
  ) {
    return {
      status: "conflicted",
      local: input.local,
      authoritative: input.authoritative,
      conflicts: ["state-differs"],
      stale: false,
      recoverable: true,
    };
  }

  return {
    status: "consistent",
    local: input.local,
    authoritative: input.authoritative,
    conflicts: [],
    stale: false,
    recoverable: true,
  };
}
