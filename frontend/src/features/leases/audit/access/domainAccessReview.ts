export interface LeasesAccessReview {
  total: number;
  denied: number;
}

export function buildLeasesAccessReview(
  total: number,
  denied: number,
): LeasesAccessReview {
  return {
    total,
    denied,
  };
}
