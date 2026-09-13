import {
  dispatchGlobalStateEvent,
} from "./dispatchGlobalStateEvent";

export async function bridgeWorkflowEvent(
  domain: string,
  type: string,
  payload: unknown,
): Promise<void> {
  await dispatchGlobalStateEvent({
    id:
      `workflow:${domain}:${Date.now()}`,
    type,
    domain,
    resourceId:
      null,
    payload,
    occurredAt:
      new Date().toISOString(),
    correlationId:
      null,
    causationId:
      null,
    source:
      "workflow",
  });
}
