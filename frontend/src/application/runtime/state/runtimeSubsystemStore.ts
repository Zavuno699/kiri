import type {
  RuntimeSubsystem,
} from "../contracts/runtimeSubsystem";

import type {
  RuntimeSubsystemState,
} from "../contracts/runtimeSubsystemState";

const states = new Map<
  RuntimeSubsystem,
  RuntimeSubsystemState
>();

export function registerRuntimeSubsystem(
  state: RuntimeSubsystemState,
): void {
  states.set(
    state.subsystem,
    state,
  );
}

export function getRuntimeSubsystemState(
  subsystem: RuntimeSubsystem,
): RuntimeSubsystemState | null {
  return (
    states.get(subsystem) ??
    null
  );
}

export function updateRuntimeSubsystem(
  subsystem: RuntimeSubsystem,
  patch: Partial<RuntimeSubsystemState>,
): void {
  const current =
    states.get(subsystem);

  if (!current) {
    return;
  }

  states.set(
    subsystem,
    {
      ...current,
      ...patch,
    },
  );
}

export function listRuntimeSubsystemStates(): RuntimeSubsystemState[] {
  return [
    ...states.values(),
  ];
}
