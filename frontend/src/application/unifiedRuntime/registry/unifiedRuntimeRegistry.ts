export interface RuntimeSubsystemRegistration {
  key: string;
  category:
    | "security"
    | "navigation"
    | "actions"
    | "health"
    | "orchestration"
    | "data"
    | "ui";
  required: boolean;
  active: boolean;
}

const registry = new Map<
  string,
  RuntimeSubsystemRegistration
>();

export function registerRuntimeSubsystem(
  subsystem: RuntimeSubsystemRegistration,
): void {
  registry.set(
    subsystem.key,
    subsystem,
  );
}

export function listRuntimeSubsystems(): RuntimeSubsystemRegistration[] {
  return [...registry.values()];
}

export function getRuntimeSubsystem(
  key: string,
): RuntimeSubsystemRegistration | null {
  return registry.get(key) ?? null;
}
