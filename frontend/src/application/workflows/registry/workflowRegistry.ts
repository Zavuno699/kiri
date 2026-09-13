import type {
  ApplicationWorkflow,
} from "../contracts/applicationWorkflow";

const workflows = new Map<
  string,
  ApplicationWorkflow
>();

export function registerWorkflow(
  workflow: ApplicationWorkflow,
): void {
  workflows.set(
    workflow.key,
    workflow,
  );
}

export function getWorkflow(
  key: string,
): ApplicationWorkflow | null {
  return workflows.get(key) ?? null;
}

export function listWorkflows(): ApplicationWorkflow[] {
  return [...workflows.values()];
}
