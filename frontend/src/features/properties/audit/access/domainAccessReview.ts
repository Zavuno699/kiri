export interface PropertiesAccessReview {
  total: number;
  denied: number;
}

export function buildPropertiesAccessReview(
  total: number,
  denied: number,
): PropertiesAccessReview {
  return {
    total,
    denied,
  };
}
