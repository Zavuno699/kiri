import type {
  StateGuardContext,
} from "../contracts/stateGuard";

import {
  selectRequiredGuards,
} from "./selectRequiredGuards";

export interface GuardEvaluation {
  status:
    | "pass"
    | "fail"
    | "unknown";
  guardIds: string[];
  reasons: string[];
}

export function evaluateGuards(
  domain: string,
  action: string,
  context: StateGuardContext,
): GuardEvaluation {
  const guards =
    selectRequiredGuards(
      domain,
      action,
    );

  if (
    guards.length ===
    0
  ) {
    return {
      status:
        "pass",
      guardIds:
        [],
      reasons:
        [],
    };
  }

  const results =
    guards.map(
      (guard) => ({
        guard,
        result:
          guard.evaluate(
            context,
          ),
      }),
    );

  const reasons =
    results
      .filter(
        (item) =>
          item.result !==
          "pass",
      )
      .map(
        (item) =>
          `${item.guard.label}: ${item.result}`,
      );

  const status =
    results.some(
      (item) =>
        item.result ===
        "fail",
    )
      ? "fail"
      : results.some(
            (item) =>
              item.result ===
              "unknown",
          )
        ? "unknown"
        : "pass";

  return {
    status,
    guardIds:
      guards.map(
        (guard) =>
          guard.id,
      ),
    reasons,
  };
}
