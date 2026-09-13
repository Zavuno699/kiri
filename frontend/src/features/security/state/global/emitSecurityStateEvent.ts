import {
  emitSecurityGlobalEvent,
} from "../events/emitSecurityGlobalEvent";

export async function emitSecurityStateEvent(
  type: string,
  payload: unknown,
): Promise<void> {
  await emitSecurityGlobalEvent(
    type,
    payload,
  );
}
