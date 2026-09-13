export type RefreshEligibility =
  | "eligible"
  | "deferred"
  | "blocked";

export function determineRefreshEligibility(
  state:
    | "consistent"
    | "aging"
    | "stale"
    | "diverged"
    | "missing",
  dependencyBlocked = false,
): RefreshEligibility {
  if (dependencyBlocked) {
    return "blocked";
  }

  if (state === "consistent") {
    return "deferred";
  }

  return "eligible";
}
