export interface DashboardRuntimeSecurityState {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
  restricted: boolean;
  reason: string | null;
}
