import type { EventVersion } from "../versioning/eventVersion";

export type EventCompatibility =
  | "compatible"
  | "upgrade-required"
  | "downgrade-required"
  | "unsupported";

export function evaluateEventCompatibility(
  incoming: EventVersion,
  supported: EventVersion,
): EventCompatibility {
  if (incoming.major === supported.major) {
    return incoming.minor <= supported.minor
      ? "compatible"
      : "upgrade-required";
  }

  if (incoming.major < supported.major) {
    return "compatible";
  }

  return "unsupported";
}
