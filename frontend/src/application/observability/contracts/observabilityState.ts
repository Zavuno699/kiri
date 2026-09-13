export interface ObservabilityState {
  selectedTraceId: string | null;
  selectedEntityId: string | null;
  selectedDomain: string | null;
  auditIds: string[];
  spanIds: string[];
  telemetryIds: string[];
  healthIds: string[];
  anomalyIds: string[];
  loading: boolean;
  error: string | null;
}
