import type {
  TraceSpan,
} from "../contracts/traceSpan";

const spans = new Map<
  string,
  TraceSpan
>();

export function startTraceSpan(
  span: TraceSpan,
): void {
  spans.set(
    span.id,
    span,
  );
}

export function finishTraceSpan(
  spanId: string,
  status:
    | "success"
    | "error"
    | "blocked",
): boolean {
  const span =
    spans.get(
      spanId,
    );

  if (!span) {
    return false;
  }

  span.endTime =
    new Date().toISOString();

  span.durationMs =
    Math.max(
      0,
      Date.now() -
        new Date(
          span.startTime,
        ).getTime(),
    );

  span.status =
    status;

  return true;
}

export function getTraceSpan(
  spanId: string,
): TraceSpan | null {
  return (
    spans.get(
      spanId,
    ) ??
    null
  );
}

export function listTraceSpans(): TraceSpan[] {
  return [
    ...spans.values(),
  ];
}

export function listTraceSpansByTrace(
  traceId: string,
): TraceSpan[] {
  return listTraceSpans().filter(
    (span) =>
      span.traceId ===
      traceId,
  );
}
