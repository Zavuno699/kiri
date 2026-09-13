import {
  flowEvent,
} from "../../../application/flows/events/flowEvent";

export async function publishDashboardFlowEvent(
  event: unknown,
): Promise<void> {
  await flowEvent(
    "dashboard",
    "dashboard",
    event,
  );
}
