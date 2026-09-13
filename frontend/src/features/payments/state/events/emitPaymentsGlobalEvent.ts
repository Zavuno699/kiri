import {
  dispatchGlobalStateEvent,
} from "../../../../application/globalState/runtime/dispatchGlobalStateEvent";

export async function emitPaymentsGlobalEvent(
  type: string,
  payload: unknown,
  resourceId?: string | null,
): Promise<void> {
  await dispatchGlobalStateEvent({
    id:
      `payments:${Date.now()}`,
    type,
    domain:
      "payments",
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
