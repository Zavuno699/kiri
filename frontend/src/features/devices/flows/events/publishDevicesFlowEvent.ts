import {
  flowEvent,
} from "../../../application/flows/events/flowEvent";

export async function publishDevicesFlowEvent(
  event: unknown,
): Promise<void> {
  await flowEvent(
    "devices",
    "devices",
    event,
  );
}
