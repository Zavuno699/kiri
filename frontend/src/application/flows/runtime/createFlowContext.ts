import {
  createDispatchContext,
} from "../../busRuntime/runtime/createDispatchContext";

export function createFlowContext(
  flowId: string,
  domain: string,
  resourceKey: string,
) {
  const context =
    createDispatchContext();

  return {
    flowId,
    domain,
    resourceKey,
    correlationId:
      context.correlationId,
    causationId:
      context.causationId,
    startedAt:
      new Date().toISOString(),
  };
}
