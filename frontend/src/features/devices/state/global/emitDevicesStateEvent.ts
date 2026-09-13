import {
  emitDevicesGlobalEvent,
} from "../events/emitDevicesGlobalEvent";

export async function emitDevicesStateEvent(
  type: string,
  payload: unknown,
): Promise<void> {
  await emitDevicesGlobalEvent(
    type,
    payload,
  );
}
