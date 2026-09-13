import {
  projectEvent,
} from "../../../../application/projections/runtime/projectEvent";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function publishDashboardEvent(
  event: unknown,
): Promise<void> {
  requireCapability(
    "dashboard.read",
  );

  await projectEvent(
    "dashboard",
    "dashboard",
    event,
  );
}
