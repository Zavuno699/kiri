import {
  selectAnomalies,
} from "../../../application/observability/selectors/selectAnomalies";

import {
  resolveAnomaly,
} from "../../../application/observability/anomalies/anomalyStore";

interface Props {
  domain?: string;
}

export function AnomalyPanel({
  domain,
}: Props) {
  const anomalies =
    selectAnomalies(
      domain,
    ).filter(
      (anomaly) =>
        !anomaly.resolved,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Active anomalies
      </div>

      <div className="mt-3 space-y-2">
        {anomalies.length ===
        0 ? (
          <div className="text-xs text-slate-500">
            No active anomalies.
          </div>
        ) : (
          anomalies.map(
            (anomaly) => (
              <div
                key={anomaly.id}
                className="rounded-lg border border-slate-800 p-3"
              >
                <div className="text-xs text-slate-200">
                  {anomaly.title}
                </div>

                <div className="mt-1 text-[11px] text-slate-500">
                  {anomaly.severity}
                  {" · "}
                  {anomaly.type}
                </div>

                <div className="mt-1 text-[10px] text-slate-600">
                  {anomaly.description}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    resolveAnomaly(
                      anomaly.id,
                    )
                  }
                  className="mt-2 rounded-md border border-slate-700 px-2 py-1 text-[10px] text-slate-400 hover:border-blue-500/40"
                >
                  Mark resolved
                </button>
              </div>
            ),
          )
        )}
      </div>
    </section>
  );
}
