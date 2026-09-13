import {
  projectEvent,
} from "../../../../application/projections/runtime/projectEvent";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function publishSecurityEvent(
  event: unknown,
): Promise<void> {
  requireCapability(
    "security.read",
  );

  await projectEvent(
    "security",
    "security",
    event,
  );
}
