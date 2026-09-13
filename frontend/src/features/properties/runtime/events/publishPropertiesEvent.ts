import {
  projectEvent,
} from "../../../../application/projections/runtime/projectEvent";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function publishPropertiesEvent(
  event: unknown,
): Promise<void> {
  requireCapability(
    "properties.read",
  );

  await projectEvent(
    "properties",
    "properties",
    event,
  );
}
