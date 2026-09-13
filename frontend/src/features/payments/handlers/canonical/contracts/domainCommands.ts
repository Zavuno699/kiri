export interface PaymentsCommandPayload {
  domain: "payments";
  action?: string;
  resourceId?: string;
  data?: Record<string, unknown>;
}
