import type {
  PolicyRequest,
} from "../contracts/policyRequest";

import {
  evaluatePolicyDecision,
} from "./evaluatePolicyDecision";

import {
  auditPolicyDecision,
} from "./auditDecision";

export function evaluateAndAuditDecision(
  request: PolicyRequest,
) {
  const decision =
    evaluatePolicyDecision(
      request,
    );

  const auditId =
    auditPolicyDecision(
      decision,
    );

  return {
    decision,
    auditId,
  };
}
