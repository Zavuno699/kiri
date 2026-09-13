import {
  evaluatePolicyDecision,
} from "../runtime/evaluatePolicyDecision";

export function evaluateSecurityLockDecision(
  entityId: string | null,
  state: Record<
    string,
    unknown
  > = {},
) {
  return evaluatePolicyDecision({
    action:
      "lock.release",
    domain:
      "locks",
    entityId,
    authorization: {
      subjectId:
        "security-operator",
      authenticated:
        true,
      roles:
        ["security-operator"],
      capabilities:
        [
          "lock.release",
        ],
      domains:
        [
          "locks",
          "security",
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
