import {
  flowEvent,
} from "../../../application/flows/events/flowEvent";

export async function publishLeasesFlowEvent(
  event: unknown,
): Promise<void> {
  await flowEvent(
    "leases",
    "leases",
    event,
  );
}
