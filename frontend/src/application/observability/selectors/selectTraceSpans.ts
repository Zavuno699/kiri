import {
  listTraceSpans,
} from "../tracing/traceStore";

export function selectTraceSpans(
  traceId?: string,
) {
  return traceId
    ? listTraceSpans().filter(
        (span) =>
          span.traceId ===
          traceId,
      )
    : listTraceSpans();
}
