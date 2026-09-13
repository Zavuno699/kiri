
import type { CapabilityKey } from "./capabilityKeys";

export interface Permission {
  capability: CapabilityKey;
  granted: boolean;
  source: "role" | "policy" | "context" | "override";
}

