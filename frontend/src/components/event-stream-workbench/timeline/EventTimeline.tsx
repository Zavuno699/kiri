import {
  selectEventTimeline,
} from "../../../application/eventStream/selectors/selectEventTimeline";

import {
  hydrateEventStream,
} from "../../../application/eventStream/runtime/hydrateEventStream";

interface Props {
  domain?: string;
}

export function EventTimeline({
  domain,
}: Props) {
  const timeline =
    selectEventTimeline(
      domain,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Event timeline
      </div>

      <div className="mt-3 space-y-2">
        {timeline.length ===
        0 ? (
          <div className="text-xs text-slate-500">
            No events observed.
          </div>
        ) : (
          timeline
            .slice(0, 20)
            .map(
              (item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    hydrateEventStream(
                      item.id,
                    )
                  }
                  className="w-full rounded-lg border border-slate-800 p-3 text-left hover:border-blue-500/40"
                >
                  <div className="text-xs text-slate-200">
                    {item.label}
                  </div>

                  <div className="mt-1 text-[11px] text-slate-500">
                    {item.eventType}
                    {" · "}
                    {item.status}
                  </div>

                  <div className="mt-1 text-[10px] text-slate-600">
                    {item.timestamp}
                  </div>
                </button>
              ),
            )
        )}
      </div>
    </section>
  );
}
