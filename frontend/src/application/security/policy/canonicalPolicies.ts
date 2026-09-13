import {
  CANONICAL_CAPABILITIES,
} from "../capabilities/canonicalCapabilities";

export function buildCanonicalPolicies() {
  return CANONICAL_CAPABILITIES.map(
    (key) => ({
      key,
      capability: {
        key,
        description:
          `KiriLock capability: ${key}`,
        dangerous:
          key.includes(".command") ||
          key.includes(".control") ||
          key.includes("recovery"),
        requiresPrincipal: true,
        requiresActiveSession: true,
      },
      allowedRoles:
        key.includes("global")
          ? ["super-admin"]
          : key.includes("control")
            ? [
                "super-admin",
                "security-admin",
                "operator",
              ]
            : [
                "super-admin",
                "security-admin",
                "operator",
                "viewer",
              ],
      deniedWhenFrozen: true,
      failClosed: true,
    }),
  );
}
