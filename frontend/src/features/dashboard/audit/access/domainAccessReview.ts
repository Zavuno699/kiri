export interface DashboardAccessReview {
  total: number;
  denied: number;
}

export function buildDashboardAccessReview(
  total: number,
  denied: number,
): DashboardAccessReview {
  return {
    total,
    denied,
  };
}
