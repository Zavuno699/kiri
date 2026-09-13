import type {
  WorkflowRequest,
} from "../contracts/workflowRequest";

import {
  orchestrateWorkflow,
} from "./orchestrateWorkflow";

import {
  auditWorkflowResult,
} from "./auditWorkflow";

export function orchestrateAndAuditWorkflow(
  request: WorkflowRequest,
) {
  const result =
    orchestrateWorkflow(
      request,
    );

  const auditId =
    auditWorkflowResult(
      result,
    );

  return {
    result,
    auditId,
  };
}
