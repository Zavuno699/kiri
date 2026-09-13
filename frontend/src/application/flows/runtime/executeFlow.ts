import type {
  ApplicationFlow,
} from "../contracts/applicationFlow";

import {
  createFlowContext,
} from "./createFlowContext";

export async function executeApplicationFlow<
  TInput,
  TResult,
>(
  flow:
    ApplicationFlow<TInput, TResult>,
  input: TInput,
  domain: string,
  resourceKey: string,
): Promise<TResult> {
  const flowId =
    `${domain}:${resourceKey}:${Date.now()}`;

  const context =
    createFlowContext(
      flowId,
      domain,
      resourceKey,
    );

  return flow.execute(
    input,
    context,
  );
}
