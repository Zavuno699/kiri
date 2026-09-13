import {
  projectEvent,
} from "../../../../application/projections/runtime/projectEvent";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function publishPaymentsEvent(
  event: unknown,
): Promise<void> {
  requireCapability(
    "payments.read",
  );

  await projectEvent(
    "payments",
    "payments",
    event,
  );
}
