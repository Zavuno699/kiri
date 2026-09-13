import {
  registerCapability,
} from "../registry/capabilityRegistry";

import {
  CANONICAL_CAPABILITIES,
} from "./canonicalCapabilities";

export function registerCanonicalCapabilities(): void {
  for (const key of CANONICAL_CAPABILITIES) {
    registerCapability({
      key,
      description:
        `KiriLock capability: ${key}`,
      dangerous:
        key.includes(".command") ||
        key.includes(".control") ||
        key.includes("recovery"),
      requiresPrincipal: true,
      requiresActiveSession: true,
    });
  }
}
