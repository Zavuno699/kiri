export interface DevicesAccessReview {
  total: number;
  denied: number;
}

export function buildDevicesAccessReview(
  total: number,
  denied: number,
): DevicesAccessReview {
  return {
    total,
    denied,
  };
}
