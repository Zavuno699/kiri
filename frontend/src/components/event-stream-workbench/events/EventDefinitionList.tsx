import {
  selectEventDefinitions,
} from "../../../application/eventStream/selectors/selectEventDefinitions";

interface Props {
  domain?: string;
}

export function EventDefinitionList({
  domain,
}: Props) {
  const events =
    selectEventDefinitions(
      domain,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Event definitions
      </div>

      <div className="mt-3 space-y-2">
        {events.map(
          (event) => (
            <div
              key={event.id}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs text-slate-200">
                {event.label}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {event.name}
                {" · v"}
                {event.version}
              </div>

              <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-600">
                {event.category}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
