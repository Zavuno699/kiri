import {
  getWorkflow,
} from "./registry/workflowRegistry";

import {
  executeWorkflow,
} from "./runtime/executeWorkflow";

export async function runApplicationWorkflow<
  TResult = unknown,
>(
  workflowKey: string,
  input: unknown,
): Promise<TResult> {
  const workflow =
    getWorkflow(workflowKey);

  if (!workflow) {
    throw new Error(
      `Workflow not registered: ${workflowKey}`,
    );
  }

  return executeWorkflow(
    workflow as never,
    input as never,
  ) as Promise<TResult>;
}
