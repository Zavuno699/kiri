import type {
  ApplicationWorkflow,
} from "../contracts/applicationWorkflow";

export async function executeWorkflow<
  TInput,
  TResult,
>(
  workflow:
    ApplicationWorkflow<TInput, TResult>,
  input: TInput,
): Promise<TResult> {
  return workflow.execute(
    input,
  );
}
