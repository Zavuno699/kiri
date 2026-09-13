import type {
  WorkflowDefinition,
} from "../contracts/workflowDefinition";

const workflows = new Map<
  string,
  WorkflowDefinition
>();

export function registerWorkflow(
  workflow: WorkflowDefinition,
): void {
  workflows.set(
    workflow.id,
    workflow,
  );
}

export function getWorkflow(
  workflowId: string,
): WorkflowDefinition | null {
  return (
    workflows.get(
      workflowId,
    ) ??
    null
  );
}

export function listWorkflows(): WorkflowDefinition[] {
  return [
    ...workflows.values(),
  ];
}

export function listWorkflowsByDomain(
  domain: string,
): WorkflowDefinition[] {
  return listWorkflows().filter(
    (workflow) =>
      workflow.domains.includes(
        domain,
      ),
  );
}
