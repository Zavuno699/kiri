import {
  listGlobalStateEvents,
} from "../../../application/globalState/events/globalStateEventStore";

export function GlobalStateEventStream() {
  const events =
    listGlobalStateEvents()
      .slice(-10)
      .reverse();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold">
        Cross-domain events
      </div>

      <div className="mt-3 space-y-2">
        {events.map(
          (event) => (
            <div
              key={event.id}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs text-slate-300">
                {event.type}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {event.domain ??
                  "global"}{" "}
                ·{" "}
                {event.source}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
