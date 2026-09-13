import type { ProjectionVersion } from "../projectionVersion";

export type ProjectionVersionVerification = {
  projectionKey: string;
  expected: ProjectionVersion;
  actual: ProjectionVersion;
  compatible: boolean;
  verifiedAt: string;
  reasons: string[];
};
