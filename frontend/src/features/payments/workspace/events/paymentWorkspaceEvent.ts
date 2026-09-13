export interface PaymentWorkspaceEvent {
  type:
    | "payments.workspace.loaded"
    | "payments.workspace.refreshed"
    | "payments.workspace.degraded"
  occurredAt: string
}
