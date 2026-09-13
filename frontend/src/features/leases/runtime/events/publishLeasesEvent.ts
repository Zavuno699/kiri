import {
  projectEvent,
} from "../../../../application/projections/runtime/projectEvent";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function publishLeasesEvent(
  event: unknown,
): Promise<void> {
  requireCapability(
    "leases.read",
  );

  await projectEvent(
    "leases",
    "leases",
    event,
  );
}
