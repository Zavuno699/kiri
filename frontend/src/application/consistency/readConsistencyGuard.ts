export type ReadConsistencyDecision =
  | "allow"
  | "refresh"
  | "reject";

export function decideReadConsistency(
  consistency: "consistent" | "mixed" | "stale" | "unknown",
  strict = false,
): ReadConsistencyDecision {
  if (consistency === "consistent") {
    return "allow";
  }

  if (consistency === "mixed" && !strict) {
    return "refresh";
  }

  if (consistency === "stale" || consistency === "unknown") {
    return strict ? "reject" : "refresh";
  }

  return strict ? "reject" : "refresh";
}
