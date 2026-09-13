export interface DashboardCommandPayload {
  domain: "dashboard";
  action?: string;
  resourceId?: string;
  data?: Record<string, unknown>;
}
