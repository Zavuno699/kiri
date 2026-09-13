export interface WorkspaceQueueItem {
  id: string;
  domain: string;
  type:
    | "payment"
    | "lease"
    | "device"
    | "lock"
    | "security"
    | "property"
    | "operator";
  title: string;
  severity:
    | "info"
    | "warning"
    | "critical";
  createdAt: string;
  requiresAction: boolean;
}
