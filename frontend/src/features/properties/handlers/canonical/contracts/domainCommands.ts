export interface PropertiesCommandPayload {
  domain: "properties";
  action?: string;
  resourceId?: string;
  data?: Record<string, unknown>;
}
