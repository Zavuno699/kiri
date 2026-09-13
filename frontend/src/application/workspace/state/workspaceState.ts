export interface WorkspaceState {
  operatorId: string | null
  selectedDomain: string | null
  selectedResourceId: string | null
  propertyId: string | null
  leaseId: string | null
  paymentId: string | null
  deviceId: string | null
  lockId: string | null
  commandMode: string
  workspaceStatus: string
}

export const initialWorkspaceState: WorkspaceState = {
  operatorId: null,
  selectedDomain: null,
  selectedResourceId: null,
  propertyId: null,
  leaseId: null,
  paymentId: null,
  deviceId: null,
  lockId: null,
  commandMode: "inspect",
  workspaceStatus: "idle",
}
