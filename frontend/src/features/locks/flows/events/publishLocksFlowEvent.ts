import {
  flowEvent,
} from "../../../application/flows/events/flowEvent";

export async function publishLocksFlowEvent(
  event: unknown,
): Promise<void> {
  await flowEvent(
    "locks",
    "locks",
    event,
  );
}
