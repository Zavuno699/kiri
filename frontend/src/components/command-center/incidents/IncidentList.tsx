import {
  listIncidents,
} from "../../../application/commandCenter/incidents/incidentStore";

export function IncidentList() {
  const incidents =
    listIncidents();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold">
        Active incidents
      </div>

      <div className="mt-3 space-y-2">
        {incidents.map(
          (incident) => (
            <div
              key={incident.id}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs font-medium text-slate-300">
                {incident.title}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {incident.domain} ·{" "}
                {incident.severity} ·{" "}
                {incident.status}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
