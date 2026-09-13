import {
  emitPropertiesGlobalEvent,
} from "../events/emitPropertiesGlobalEvent";

export async function emitPropertiesStateEvent(
  type: string,
  payload: unknown,
): Promise<void> {
  await emitPropertiesGlobalEvent(
    type,
    payload,
  );
}
