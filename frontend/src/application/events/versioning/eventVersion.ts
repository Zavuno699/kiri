export type EventVersion = {
  major: number;
  minor: number;
};

export const currentEventVersion: EventVersion = {
  major: 1,
  minor: 0,
};

export function formatEventVersion(
  version: EventVersion,
): string {
  return `${version.major}.${version.minor}`;
}
