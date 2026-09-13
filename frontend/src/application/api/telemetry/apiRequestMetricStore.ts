import type {
  ApiRequestMetric,
} from "./apiRequestMetric";

const metrics:
  ApiRequestMetric[] = [];

export function recordApiRequestMetric(
  metric: ApiRequestMetric,
): void {
  metrics.push(
    metric,
  );

  if (
    metrics.length > 500
  ) {
    metrics.shift();
  }
}

export function listApiRequestMetrics(): ApiRequestMetric[] {
  return [
    ...metrics,
  ];
}
