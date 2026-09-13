import {
  dispatchGlobalStateEvent,
} from "../../../../application/globalState/runtime/dispatchGlobalStateEvent";

export async function emitDevicesGlobalEvent(
  type: string,
  payload: unknown,
  resourceId?: string | null,
): Promise<void> {
  await dispatchGlobalStateEvent({
    id:
      `devices:${Date.now()}`,
    type,
    domain:
      "devices",
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
