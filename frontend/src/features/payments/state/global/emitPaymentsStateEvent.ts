import {
  emitPaymentsGlobalEvent,
} from "../events/emitPaymentsGlobalEvent";

export async function emitPaymentsStateEvent(
  type: string,
  payload: unknown,
): Promise<void> {
  await emitPaymentsGlobalEvent(
    type,
    payload,
  );
}
