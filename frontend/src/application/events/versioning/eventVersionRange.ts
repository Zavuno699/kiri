import type { EventVersion } from "./eventVersion";

export type EventVersionRange = {
  minimum: EventVersion;
  maximum: EventVersion;
};

export function isEventVersionInRange(
  version: EventVersion,
  range: EventVersionRange,
): boolean {
  const value = version.major * 1000 + version.minor;
  const minimum =
    range.minimum.major * 1000 + range.minimum.minor;
  const maximum =
    range.maximum.major * 1000 + range.maximum.minor;

  return value >= minimum && value <= maximum;
}
