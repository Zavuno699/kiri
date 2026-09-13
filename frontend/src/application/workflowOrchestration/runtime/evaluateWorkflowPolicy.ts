import type {
  WorkflowRequest,
} from "../contracts/workflowRequest";

import type {
  WorkflowDefinition,
} from "../contracts/workflowDefinition";

import {
  getWorkflow,
} from "../registry/workflowRegistry";

import {
  evaluatePolicyDecision,
} from "../../policyDecision/runtime/evaluatePolicyDecision";

export function evaluateWorkflowPolicy(
  request: WorkflowRequest,
): {
  workflow: WorkflowDefinition | null;
  allowed: boolean;
  policyDecisionId: string | null;
  risk: string;
  reasons: string[];
} {
  const workflow =
    getWorkflow(
      request.workflowId,
    );

  if (!workflow) {
    return {
      workflow:
        null,
      allowed:
        false,
      policyDecisionId:
        null,
      risk:
        "critical",
      reasons:
        ["Workflow not registered."],
    };
  }

  if (!workflow.enabled) {
    return {
      workflow,
      allowed:
        false,
      policyDecisionId:
        null,
      risk:
        workflow.risk,
      reasons:
        ["Workflow disabled."],
    };
  }

  const primaryDomain =
    workflow.domains[0] ??
    "global";

  const policy =
    evaluatePolicyDecision({
      action:
        `workflow:${workflow.id}`,
      domain:
        primaryDomain,
      entityId:
        request.entityId,
      authorization: {
        subjectId:
          request.subjectId,
        authenticated:
          Boolean(
            request.subjectId,
          ),
        roles:
          ["operator"],
        capabilities:
          [
            `workflow:${workflow.id}`,
          ],
        domains:
          [
            ...workflow.domains,
            "global",
          ],
        elevated:
          workflow.risk ===
            "critical" ||
          workflow.risk ===
            "high",
      },
      state:
        request.parameters,
      parameters:
        request.parameters,
      confirmed:
        request.confirmed,
    });

  return {
    workflow,
    allowed:
      policy.allowed,
    policyDecisionId:
      policy.id,
    risk:
      policy.risk.level,
    reasons:
      policy.reasons,
  };
}
