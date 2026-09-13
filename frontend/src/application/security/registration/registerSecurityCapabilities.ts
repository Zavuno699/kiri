
import { registerCapability } from "../permissions/capabilityRegistry";
import { CAPABILITIES } from "../permissions/capabilityKeys";

export function registerSecurityCapabilities(): void {
  for (const key of Object.values(CAPABILITIES)) {
    registerCapability({
      key,
      description: `KiriLock capability ${key}`,
      sensitive:
        key.includes("command") ||
        key.includes("security") ||
        key.includes("session"),
      requiresAuthenticatedSession: true,
      dangerous:
        key.includes("command") ||
        key === CAPABILITIES.securityAdmin ||
        key === CAPABILITIES.sessionManage,
    });
  }
}

