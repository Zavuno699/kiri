import {
  emitLeasesGlobalEvent,
} from "../events/emitLeasesGlobalEvent";

export async function emitLeasesStateEvent(
  type: string,
  payload: unknown,
): Promise<void> {
  await emitLeasesGlobalEvent(
    type,
    payload,
  );
}
