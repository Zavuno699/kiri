import {
  projectEvent,
} from "../../../../application/projections/runtime/projectEvent";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function publishLocksEvent(
  event: unknown,
): Promise<void> {
  requireCapability(
    "locks.read",
  );

  await projectEvent(
    "locks",
    "locks",
    event,
  );
}
