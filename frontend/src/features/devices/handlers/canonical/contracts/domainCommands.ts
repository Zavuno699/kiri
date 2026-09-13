export interface DevicesCommandPayload {
  domain: "devices";
  action?: string;
  resourceId?: string;
  data?: Record<string, unknown>;
}
