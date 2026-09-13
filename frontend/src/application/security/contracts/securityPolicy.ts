import type {
  SecurityCapability,
} from "./securityCapability";

export interface SecurityPolicy {
  key: string;
  capability: SecurityCapability;
  allowedRoles: string[];
  deniedWhenFrozen: boolean;
  failClosed: boolean;
}
