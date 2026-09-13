import type { RecoveryScope } from "../recoveryTypes";

export interface RecoveryPolicy {
  scope: RecoveryScope;
  maxAttempts: number;
  automatic: boolean;
  destructive: boolean;
}

export const RECOVERY_POLICIES: RecoveryPolicy[] = [
  {
    scope: "runtime",
    maxAttempts: 3,
    automatic: true,
    destructive: false,
  },
  {
    scope: "session",
    maxAttempts: 2,
    automatic: false,
    destructive: false,
  },
  {
    scope: "resource",
    maxAttempts: 3,
    automatic: true,
    destructive: false,
  },
  {
    scope: "command",
    maxAttempts: 1,
    automatic: false,
    destructive: false,
  },
  {
    scope: "cache",
    maxAttempts: 2,
    automatic: true,
    destructive: false,
  },
  {
    scope: "workspace",
    maxAttempts: 3,
    automatic: true,
    destructive: false,
  },
  {
    scope: "global",
    maxAttempts: 1,
    automatic: false,
    destructive: false,
  },
];
