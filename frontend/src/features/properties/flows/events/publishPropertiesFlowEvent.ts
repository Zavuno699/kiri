import {
  flowEvent,
} from "../../../../application/flows/events/flowEvent";

export async function publishPropertiesFlowEvent(
  event: unknown,
): Promise<void> {
  await flowEvent(
    "properties",
    "properties",
    event as { type: string; payload: unknown },
  );
}
