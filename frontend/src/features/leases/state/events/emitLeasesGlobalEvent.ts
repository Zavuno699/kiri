import {
  dispatchGlobalStateEvent,
} from "../../../../application/globalState/runtime/dispatchGlobalStateEvent";

export async function emitLeasesGlobalEvent(
  type: string,
  payload: unknown,
  resourceId?: string | null,
): Promise<void> {
  await dispatchGlobalStateEvent({
    id:
      `leases:${Date.now()}`,
    type,
    domain:
      "leases",
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
