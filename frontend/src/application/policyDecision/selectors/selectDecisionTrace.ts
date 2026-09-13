import {
  getDecision,
} from "../decisions/decisionStore";

import {
  buildDecisionTrace,
} from "../decisions/buildDecisionTrace";

export function selectDecisionTrace(
  decisionId: string,
) {
  const decision =
    getDecision(
      decisionId,
    );

  return decision
    ? buildDecisionTrace(
        decision,
      )
    : null;
}
