export interface OperationalCount {
  total: number
  active: number
  exceptions: number
}

export function countOperationalStates(
  values: Array<{
    status?: string
  }>,
): OperationalCount {
  return {
    total: values.length,
    active: values.filter(
      (value) =>
        value.status === "active" ||
        value.status === "healthy" ||
        value.status === "settled" ||
        value.status === "online",
    ).length,
    exceptions: values.filter(
      (value) =>
        value.status === "failed" ||
        value.status === "critical" ||
        value.status === "offline" ||
        value.status === "delinquent",
    ).length,
  }
}
