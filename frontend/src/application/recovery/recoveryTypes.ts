export type RecoveryStatus =
  | "idle"
  | "detecting"
  | "recovering"
  | "recovered"
  | "degraded"
  | "failed";

export type RecoveryScope =
  | "runtime"
  | "session"
  | "resource"
  | "command"
  | "cache"
  | "workspace"
  | "global";
