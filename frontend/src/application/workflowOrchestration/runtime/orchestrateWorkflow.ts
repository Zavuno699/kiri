import type {
  WorkflowRequest,
} from "../contracts/workflowRequest";

import type {
  WorkflowResult,
} from "../contracts/workflowResult";

import {
  evaluateWorkflowPolicy,
} from "./evaluateWorkflowPolicy";

import {
  listWorkflowStepsFor,
} from "../registry/workflowStepRegistry";

import {
  executeWorkflowStep,
} from "./executeWorkflowStep";

import {
  listCompensationForWorkflow,
} from "../compensation/compensationRegistry";

import {
  executeCompensation,
} from "../compensation/executeCompensation";

import {
  setWorkflowExecutionState,
} from "../state/workflowExecutionStore";

export function orchestrateWorkflow(
  request: WorkflowRequest,
): WorkflowResult {
  setWorkflowExecutionState({
    activeWorkflowId:
      request.workflowId,
    correlationId:
      request.correlationId,
    entityId:
      request.entityId,
    outcome:
      "accepted",
    activeStepId:
      null,
    completedStepIds:
      [],
    failedStepId:
      null,
    compensationStepIds:
      [],
    reasons:
      [],
    loading:
      true,
    error:
      null,
  });

  const policy =
    evaluateWorkflowPolicy(
      request,
    );

  if (!policy.allowed) {
    const result: WorkflowResult = {
      workflowId:
        request.workflowId,
      correlationId:
        request.correlationId,
      outcome:
        "blocked",
      completedStepIds:
        [],
      failedStepId:
        null,
      compensationStepIds:
        [],
      reasons:
        policy.reasons.length
          ? policy.reasons
          : [
              "Workflow policy denied.",
            ],
    };

    setWorkflowExecutionState({
      outcome:
        "blocked",
      loading:
        false,
      reasons:
        result.reasons,
    });

    return result;
  }

  const steps =
    listWorkflowStepsFor(
      request.workflowId,
    );

  const completed: string[] =
    [];
  let failedStepId:
    string | null =
    null;
  const reasons: string[] =
    [];

  setWorkflowExecutionState({
    outcome:
      "running",
  });

  for (
    const step of
      steps
  ) {
    setWorkflowExecutionState({
      activeStepId:
        step.id,
    });

    const execution =
      executeWorkflowStep(
        step,
        request.entityId,
        request.correlationId,
        request.parameters,
      );

    if (!execution.success) {
      failedStepId =
        step.id;

      reasons.push(
        `${step.name}: ${execution.message}`,
      );

      break;
    }

    completed.push(
      step.id,
    );

    setWorkflowExecutionState({
      completedStepIds:
        [...completed],
    });
  }

  if (
    failedStepId
  ) {
    const compensation =
      listCompensationForWorkflow(
        request.workflowId,
      );

    const compensationIds: string[] =
      [];

    for (
      const action of
        compensation
    ) {
      if (
        !completed.includes(
          action.stepId,
        )
      ) {
        continue;
      }

      const result =
        executeCompensation(
          action,
          request.entityId,
          request.correlationId,
        );

      if (
        result.success
      ) {
        compensationIds.push(
          action.id,
        );
      } else {
        reasons.push(
          `${action.id}: ${result.message}`,
        );
      }
    }

    setWorkflowExecutionState({
      outcome:
        "compensated",
      activeStepId:
        null,
      failedStepId,
      compensationStepIds:
        compensationIds,
      loading:
        false,
      reasons,
    });

    return {
      workflowId:
        request.workflowId,
      correlationId:
        request.correlationId,
      outcome:
        "compensated",
      completedStepIds:
        completed,
      failedStepId,
      compensationStepIds:
        compensationIds,
      reasons,
    };
  }

  setWorkflowExecutionState({
    outcome:
      "completed",
    activeStepId:
      null,
    loading:
      false,
    reasons:
      [],
  });

  return {
    workflowId:
      request.workflowId,
    correlationId:
      request.correlationId,
    outcome:
      "completed",
    completedStepIds:
      completed,
    failedStepId:
      null,
    compensationStepIds:
      [],
    reasons:
      [],
  };
}
