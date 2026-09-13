import {
  listApiRequestMetrics,
} from "./apiRequestMetricStore";

export function getApiRequestMetrics() {
  const metrics =
    listApiRequestMetrics();

  return {
    total:
      metrics.length,

    successes:
      metrics.filter(
        (item) =>
          item.success,
      ).length,

    failures:
      metrics.filter(
        (item) =>
          !item.success,
      ).length,

    averageDurationMs:
      metrics.length
        ? metrics.reduce(
            (
              total,
              item,
            ) =>
              total +
              item.durationMs,
            0,
          ) /
          metrics.length
        : 0,
  };
}
