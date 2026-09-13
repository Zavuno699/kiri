import {
  listIncidentTimeline,
} from "../../../application/commandCenter/incidents/incidentTimelineStore";

export function IncidentTimeline() {
  const timeline =
    listIncidentTimeline();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold">
        Incident timeline
      </div>

      <div className="mt-3 space-y-2">
        {timeline.map(
          (entry) => (
            <div
              key={entry.id}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs text-slate-300">
                {entry.action}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {entry.occurredAt}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
