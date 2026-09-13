import {
  finishTraceSpan,
} from "../tracing/traceStore";

export function finishOperationTrace(
  spanId: string,
  status:
    | "success"
    | "error"
    | "blocked",
): boolean {
  return finishTraceSpan(
    spanId,
    status,
  );
}
