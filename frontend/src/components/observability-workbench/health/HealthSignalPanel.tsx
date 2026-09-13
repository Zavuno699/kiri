import {
  selectHealthSignals,
} from "../../../application/observability/selectors/selectHealthSignals";

interface Props {
  domain?: string;
}

export function HealthSignalPanel({
  domain,
}: Props) {
  const signals =
    selectHealthSignals(
      domain,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Component health
      </div>

      <div className="mt-3 space-y-2">
        {signals.length ===
        0 ? (
          <div className="text-xs text-slate-500">
            No health checks recorded.
          </div>
        ) : (
          signals.map(
            (signal) => (
              <div
                key={signal.id}
                className="rounded-lg border border-slate-800 p-3"
              >
                <div className="text-xs text-slate-200">
                  {signal.component}
                </div>

                <div className="mt-1 text-[11px] text-slate-500">
                  {signal.status}
                  {" · "}
                  {signal.message}
                </div>

                <div className="mt-1 text-[10px] text-slate-600">
                  latency:{" "}
                  {signal.latencyMs ??
                    "n/a"}
                  {signal.latencyMs !==
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
