import {
  listWorkflows,
  listWorkflowsByDomain,
} from "../registry/workflowRegistry";

export function selectWorkflows(
  domain?: string,
) {
  return domain
    ? listWorkflowsByDomain(
        domain,
      )
    : listWorkflows();
}
