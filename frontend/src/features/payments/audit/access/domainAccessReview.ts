export interface PaymentsAccessReview {
  total: number;
  denied: number;
}

export function buildPaymentsAccessReview(
  total: number,
  denied: number,
): PaymentsAccessReview {
  return {
    total,
    denied,
  };
}
