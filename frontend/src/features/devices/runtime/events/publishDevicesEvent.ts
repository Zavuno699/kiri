import {
  projectEvent,
} from "../../../../application/projections/runtime/projectEvent";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function publishDevicesEvent(
  event: unknown,
): Promise<void> {
  requireCapability(
    "devices.read",
  );

  await projectEvent(
    "devices",
    "devices",
    event,
  );
}
