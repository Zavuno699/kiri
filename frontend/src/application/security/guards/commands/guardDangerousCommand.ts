import {
  getCapability,
} from "../../registry/capabilityRegistry";

import {
  requireCapability,
} from "../requireCapability";

export function guardDangerousCommand(
  capability: string,
): void {
  const descriptor =
    getCapability(
      capability,
    );

  if (
    !descriptor ||
    !descriptor.dangerous
  ) {
    throw new Error(
      "Dangerous command capability required",
    );
  }

  requireCapability(
    capability,
  );
}
