import {
  listWorkflows,
} from "../registry/workflowRegistry";

export function getWorkflowDiagnostics() {
  return {
    workflowCount:
      listWorkflows().length,

    workflows:
      listWorkflows()
        .map(
          (workflow) => ({
            key:
              workflow.key,
          }),
        ),
  };
}
