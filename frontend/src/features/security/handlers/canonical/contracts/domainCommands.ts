export interface SecurityCommandPayload {
  domain: "security";
  action?: string;
  resourceId?: string;
  data?: Record<string, unknown>;
}
