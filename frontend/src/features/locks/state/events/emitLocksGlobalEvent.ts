import {
  dispatchGlobalStateEvent,
} from "../../../../application/globalState/runtime/dispatchGlobalStateEvent";

export async function emitLocksGlobalEvent(
  type: string,
  payload: unknown,
  resourceId?: string | null,
): Promise<void> {
  await dispatchGlobalStateEvent({
    id:
      `locks:${Date.now()}`,
    type,
    domain:
      "locks",
    resourceId:
      resourceId ??
      null,
    payload,
    occurredAt:
      new Date().toISOString(),
    correlationId:
      null,
    causationId:
      null,
    source:
      "event",
  });
}
