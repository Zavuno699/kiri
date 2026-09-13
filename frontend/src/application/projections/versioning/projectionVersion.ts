export type ProjectionVersion = {
  major: number;
  minor: number;
  patch: number;
};

export const currentProjectionVersion: ProjectionVersion = {
  major: 1,
  minor: 0,
  patch: 0,
};

export function formatProjectionVersion(
  version: ProjectionVersion,
): string {
  return `${version.major}.${version.minor}.${version.patch}`;
}
