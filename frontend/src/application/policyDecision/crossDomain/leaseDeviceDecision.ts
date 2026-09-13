import {
  evaluatePolicyDecision,
} from "../runtime/evaluatePolicyDecision";

export function evaluateLeaseDeviceDecision(
  entityId: string | null,
  state: Record<
    string,
    unknown
  > = {},
) {
  return evaluatePolicyDecision({
    action:
      "device.reconcile",
    domain:
      "devices",
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
          "device.reconcile",
        ],
      domains:
        [
          "devices",
          "global",
        ],
      elevated:
        false,
    },
    state,
    parameters:
      {},
    confirmed:
      false,
  });
}
