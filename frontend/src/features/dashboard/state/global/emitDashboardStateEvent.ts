import {
  emitDashboardGlobalEvent,
} from "../events/emitDashboardGlobalEvent";

export async function emitDashboardStateEvent(
  type: string,
  payload: unknown,
): Promise<void> {
  await emitDashboardGlobalEvent(
    type,
    payload,
  );
}
