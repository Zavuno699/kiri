export interface LocksAccessReview {
  total: number;
  denied: number;
}

export function buildLocksAccessReview(
  total: number,
  denied: number,
): LocksAccessReview {
  return {
    total,
    denied,
  };
}
