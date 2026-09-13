export interface CommandCenterState {
  status:
    | "idle"
    | "operational"
    | "degraded"
    | "incident"
    | "recovery"
    | "safe";
  activeIncidentId: string | null;
  activeRecoveryId: string | null;
  criticalCount: number;
  warningCount: number;
  infoCount: number;
  lastUpdatedAt: string | null;
}
