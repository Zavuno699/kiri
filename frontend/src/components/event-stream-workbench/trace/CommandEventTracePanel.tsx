import {
  selectCommandEventTrace,
} from "../../../application/eventStream/selectors/selectCommandEventTrace";

interface Props {
  commandId: string;
}

export function CommandEventTracePanel({
  commandId,
}: Props) {
  const links =
    selectCommandEventTrace(
      commandId,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Command → event trace
      </div>

      <div className="mt-3 space-y-2">
        {links.length ===
        0 ? (
          <div className="text-xs text-slate-500">
            No event mappings.
          </div>
        ) : (
          links.map(
            (link) => (
              <div
                key={link.id}
                className="rounded-lg border border-slate-800 p-3"
              >
                <div className="text-xs text-slate-300">
                  {link.commandId}
                  {" → "}
                  {link.eventType}
                </div>

                <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-600">
                  {link.relation}
                  {" · "}
                  {link.required
                    ? "required"
                    : "optional"}
                </div>
              </div>
            ),
          )
        )}
      </div>
    </section>
  );
}
