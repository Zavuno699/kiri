export interface StateGuardContext {
  domain: string;
  entityId: string;
  fromState: string;
  toState: string;
  action: string;
  context: Record<string, unknown>;
}

export interface StateGuardDefinition {
  id: string;
  domain: string;
  name: string;
  label: string;
  description: string;
  required: boolean;
  evaluate(
    context: StateGuardContext,
  ): "pass" | "fail" | "unknown";
}
