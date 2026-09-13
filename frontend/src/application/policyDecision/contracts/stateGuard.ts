export type StateGuardResult =
  | "pass"
  | "fail"
  | "unknown";

export interface StateGuard {
  id: string;
  domain: string;
  name: string;
  label: string;
  description: string;
  required: boolean;
  evaluate:
    (context: StateGuardContext) =>
      StateGuardResult;
}

export interface StateGuardContext {
  entityId: string | null;
  domain: string;
  action: string;
  state: Record<string, unknown>;
}
