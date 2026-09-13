export interface TraceSpan {
  id: string;
  traceId: string;
  parentSpanId: string | null;
  operation: string;
  domain: string;
  startTime: string;
  endTime: string | null;
  durationMs: number | null;
  status:
    | "running"
    | "success"
    | "error"
    | "blocked";
  metadata: Record<string, unknown>;
}
