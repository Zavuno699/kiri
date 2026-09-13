import {
  registerRuntimeSubsystem,
} from "../state/runtimeSubsystemStore";

const subsystems = [
  "buses",
  "handlers",
  "projections",
  "workflows",
  "persistence",
  "realtime",
  "security",
  "navigation",
  "api",
  "services",
  "providers",
] as const;

export function registerRuntimeSubsystems(): void {
  for (const subsystem of subsystems) {
    registerRuntimeSubsystem({
      subsystem,
      initialized: false,
      ready: false,
      degraded: false,
      initializedAt: null,
      reason: null,
    });
  }
}
