export interface StateInvariantContext {
  domain: string;
  entityId: string;
  state: string;
  context: Record<string, unknown>;
}

export interface StateInvariantDefinition {
  id: string;
  domain: string;
  name: string;
  label: string;
  description: string;
  severity:
    | "warning"
    | "critical";
  validate(
    context: StateInvariantContext,
  ): "pass" | "fail" | "unknown";
}
