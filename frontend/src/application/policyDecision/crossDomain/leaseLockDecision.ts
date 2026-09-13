import {
  evaluatePolicyDecision,
} from "../runtime/evaluatePolicyDecision";

export function evaluateLeaseLockDecision(
  entityId: string | null,
  state: Record<
    string,
    unknown
  > = {},
) {
  return evaluatePolicyDecision({
    action:
      "lock.secure",
    domain:
      "locks",
    entityId,
    authorization: {
      subjectId:
        "operator",
      authenticated:
        true,
      roles:
        ["operator"],
      capabilities:
        [
          "lock.secure",
        ],
      domains:
        [
          "locks",
          "global",
        ],
      elevated:
        true,
    },
    state,
    parameters:
      {},
    confirmed:
      true,
  });
}
