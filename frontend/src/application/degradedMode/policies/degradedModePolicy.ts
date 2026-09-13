import type { DegradedMode } from "../degradedModeTypes";

export interface DegradedModePolicy {
  mode: DegradedMode;
  allowReads: boolean;
  allowWrites: boolean;
  allowCommands: boolean;
  allowSecurityAdmin: boolean;
}

export const DEGRADED_MODE_POLICIES: Record<
  DegradedMode,
  DegradedModePolicy
> = {
  normal: {
    mode: "normal",
    allowReads: true,
    allowWrites: true,
    allowCommands: true,
    allowSecurityAdmin: true,
  },
  limited: {
    mode: "limited",
    allowReads: true,
    allowWrites: true,
    allowCommands: false,
    allowSecurityAdmin: false,
  },
  restricted: {
    mode: "restricted",
    allowReads: true,
    allowWrites: false,
    allowCommands: false,
    allowSecurityAdmin: false,
  },
  critical: {
    mode: "critical",
    allowReads: false,
    allowWrites: false,
    allowCommands: false,
    allowSecurityAdmin: false,
  },
};
