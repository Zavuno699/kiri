export type VersionConsistencyState =
  | "consistent"
  | "mixed"
  | "unknown";

export function evaluateVersionConsistency(
  versions: Record<string, string>,
): VersionConsistencyState {
  const values = Object.values(versions);

  if (values.length === 0) {
    return "unknown";
  }

  return new Set(values).size === 1
    ? "consistent"
    : "mixed";
}
