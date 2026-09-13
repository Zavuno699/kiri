import {
  startTraceSpan,
} from "../tracing/traceStore";

export function startOperationTrace(input: {
  traceId: string;
  operation: string;
  domain: string;
  parentSpanId?: string | null;
  metadata?: Record<
    string,
    unknown
  >;
}): string {
  const spanId =
    `span-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  startTraceSpan({
    id:
      spanId,
    traceId:
      input.traceId,
    parentSpanId:
      input.parentSpanId ??
      null,
    operation:
      input.operation,
    domain:
      input.domain,
    startTime:
      new Date().toISOString(),
    endTime:
      null,
    durationMs:
      null,
    status:
      "running",
    metadata:
      input.metadata ??
      {},
  });

  return spanId;
}
