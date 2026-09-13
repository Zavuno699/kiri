export type DependencyConsistencyState =
  | "ready"
  | "blocked"
  | "degraded";

export type DependencyConsistencyInput = {
  required: boolean;
  sourceAvailable: boolean;
  targetAvailable: boolean;
};

export function evaluateDependencyConsistency(
  input: DependencyConsistencyInput,
): DependencyConsistencyState {
  if (input.sourceAvailable && input.targetAvailable) {
    return "ready";
  }

  if (input.required) {
    return "blocked";
  }

  return "degraded";
}
