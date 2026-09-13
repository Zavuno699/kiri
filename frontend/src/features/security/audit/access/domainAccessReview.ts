export interface SecurityAccessReview {
  total: number;
  denied: number;
}

export function buildSecurityAccessReview(
  total: number,
  denied: number,
): SecurityAccessReview {
  return {
    total,
    denied,
  };
}
