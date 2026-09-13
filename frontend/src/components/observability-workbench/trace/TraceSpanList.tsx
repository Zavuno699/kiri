import {
  selectTraceSpans,
} from "../../../application/observability/selectors/selectTraceSpans";

interface Props {
  traceId?: string;
}

export function TraceSpanList({
  traceId,
}: Props) {
  const spans =
    selectTraceSpans(
      traceId,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Operation traces
      </div>

      <div className="mt-3 space-y-2">
        {spans.length ===
        0 ? (
          <div className="text-xs text-slate-500">
            No operation spans recorded.
          </div>
        ) : (
          spans
            .slice(0, 20)
            .map(
              (span) => (
                <div
                  key={span.id}
                  className="rounded-lg border border-slate-800 p-3"
                >
                  <div className="text-xs text-slate-200">
                    {span.operation}
                  </div>

                  <div className="mt-1 text-[11px] text-slate-500">
                    {span.domain}
                    {" · "}
                    {span.status}
                  </div>

                  <div className="mt-1 text-[10px] text-slate-600">
                    duration:{" "}
                    {span.durationMs ??
                      "running"}
                    {span.durationMs !==
                    null
                      ? "ms"
                      : ""}
                  </div>
                </div>
              ),
            )
        )}
      </div>
    </section>
  );
}
