export interface OperatorWorkspaceState {
  operatorId: string | null;
  selectedDomain: string | null;
  selectedResourceId: string | null;
  selectedPropertyId: string | null;
  selectedLeaseId: string | null;
  selectedDeviceId: string | null;
  selectedLockId: string | null;
  selectedPaymentId: string | null;
  searchTerm: string;
  commandMode:
    | "normal"
    | "command"
    | "recovery";
  workspaceStatus:
    | "idle"
    | "ready"
    | "degraded"
    | "restricted";
  lastUpdatedAt: string | null;
}
