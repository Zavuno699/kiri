import {
  flowEvent,
} from "../../../../application/flows/events/flowEvent";

export async function publishSecurityFlowEvent(
  event: unknown,
): Promise<void> {
  await flowEvent(
    "security",
    "security",
    event as { type: string; payload: unknown },
  );
}
