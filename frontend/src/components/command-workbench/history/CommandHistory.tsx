import {
  listCommandHistory,
} from "../../../application/commandQuery/events/commandHistoryStore";

export function CommandHistory() {
  const history =
    listCommandHistory();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Command history
      </div>

      <div className="mt-3 space-y-2">
        {history.length ===
        0 ? (
          <div className="text-xs text-slate-500">
            No commands recorded.
          </div>
        ) : (
          history
            .slice(0, 10)
            .map(
              (entry) => (
                <div
                  key={entry.id}
                  className="rounded-lg border border-slate-800 p-3"
                >
                  <div className="text-xs text-slate-300">
                    {entry.commandId}
                  </div>

                  <div className="mt-1 text-[11px] text-slate-500">
                    {entry.status}
                    {" · "}
                    {entry.message}
                  </div>
                </div>
              ),
            )
        )}
      </div>
    </section>
  );
}
