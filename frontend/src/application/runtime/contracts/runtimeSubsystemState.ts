import type {
  RuntimeSubsystem,
} from "./runtimeSubsystem";

export interface RuntimeSubsystemState {
  subsystem: RuntimeSubsystem;
  initialized: boolean;
  ready: boolean;
  degraded: boolean;
  initializedAt: string | null;
  reason: string | null;
}
