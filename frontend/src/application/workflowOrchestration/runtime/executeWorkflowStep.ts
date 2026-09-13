import type {
  WorkflowStep,
} from "../contracts/workflowStep";

import {
  executeCommand,
} from "../../commandQuery/runtime/executeCommand";

import {
  executeQuery,
} from "../../commandQuery/runtime/executeQuery";

import {
  getDecision,
} from "../../policyDecision/decisions/decisionStore";

export interface WorkflowStepExecution {
  success: boolean;
  message: string;
  result: unknown;
}

export function executeWorkflowStep(
  step: WorkflowStep,
  entityId: string | null,
  correlationId: string,
  parameters:
    Record<string, unknown>,
): WorkflowStepExecution {
  if (
    step.type ===
    "policy"
  ) {
    return {
      success:
        true,
      message:
        "Policy step delegated to workflow policy gate.",
      result:
        getDecision(
          correlationId,
        ),
    };
  }

  if (
    step.type ===
    "command"
  ) {
    const result =
      executeCommand({
        commandId:
          step.action,
        entityId,
        domain:
          step.domain,
        parameters,
        correlationId,
        requestedAt:
          new Date().toISOString(),
      });

    return {
      success:
        result.accepted,
      message:
        result.message,
      result,
    };
  }

  if (
    step.type ===
    "query"
  ) {
    const result =
      executeQuery({
        queryId:
          step.action,
        entityId,
        domain:
          step.domain,
        parameters,
        requestedAt:
          new Date().toISOString(),
      });

    return {
      success:
        result.success,
      message:
        result.message ??
        "Query completed.",
      result,
    };
  }

  return {
    success:
      true,
    message:
      `Workflow ${step.type} step prepared.`,
    result:
      null,
  };
}
