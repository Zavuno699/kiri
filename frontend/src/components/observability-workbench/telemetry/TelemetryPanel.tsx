import {
  selectTelemetry,
} from "../../../application/observability/selectors/selectTelemetry";

interface Props {
  domain?: string;
}

export function TelemetryPanel({
  domain,
}: Props) {
  const signals =
    selectTelemetry(
      domain,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Telemetry
      </div>

      <div className="mt-3 space-y-2">
        {signals.length ===
        0 ? (
          <div className="text-xs text-slate-500">
            No telemetry signals recorded.
          </div>
        ) : (
          signals
            .slice(0, 20)
            .map(
              (signal) => (
                <div
                  key={signal.id}
                  className="rounded-lg border border-slate-800 p-3"
                >
                  <div className="text-xs text-slate-200">
                    {signal.name}
                  </div>

                  <div className="mt-1 text-[11px] text-slate-500">
                    {signal.value}
                    {" "}
                    {signal.unit}
                    {" · "}
                    {signal.severity}
                  </div>
                </div>
              ),
            )
        )}
      </div>
    </section>
  );
}
