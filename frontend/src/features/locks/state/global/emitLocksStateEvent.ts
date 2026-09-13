import {
  emitLocksGlobalEvent,
} from "../events/emitLocksGlobalEvent";

export async function emitLocksStateEvent(
  type: string,
  payload: unknown,
): Promise<void> {
  await emitLocksGlobalEvent(
    type,
    payload,
  );
}
