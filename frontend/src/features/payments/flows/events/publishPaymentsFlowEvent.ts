import {
  flowEvent,
} from "../../../application/flows/events/flowEvent";

export async function publishPaymentsFlowEvent(
  event: unknown,
): Promise<void> {
  await flowEvent(
    "payments",
    "payments",
    event,
  );
}
