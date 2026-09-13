import {
  dispatchGlobalStateEvent,
} from "../../../../application/globalState/runtime/dispatchGlobalStateEvent";

export async function emitDashboardGlobalEvent(
  type: string,
  payload: unknown,
  resourceId?: string | null,
): Promise<void> {
  await dispatchGlobalStateEvent({
    id:
      `dashboard:${Date.now()}`,
    type,
    domain:
      "dashboard",
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
