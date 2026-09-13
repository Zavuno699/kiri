import {
  publishApplicationEvent,
} from "../../busRuntime/runtime/publishEvent";

import {
  applyProjection,
} from "./applyProjection";

export async function projectEvent(
  domain: string,
  resourceKey: string,
  event: unknown,
): Promise<void> {
  await publishApplicationEvent(
    event as never,
  );

  applyProjection({
    domain,
    resourceKey,
    payload: event,
    source: "event",
    receivedAt:
      new Date().toISOString(),
  });
}
