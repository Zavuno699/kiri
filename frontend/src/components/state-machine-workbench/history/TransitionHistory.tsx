import {
  selectTransitionHistory,
} from "../../../application/stateMachine/selectors/selectTransitionHistory";

interface Props {
  domain?: string;
  entityId?: string;
}

export function TransitionHistory({
  domain,
  entityId,
}: Props) {
  const history =
    selectTransitionHistory({
      domain,
      entityId,
    });

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Transition history
      </div>

      <div className="mt-3 space-y-2">
        {history.length ===
        0 ? (
          <div className="text-xs text-slate-500">
            No transitions recorded.
          </div>
        ) : (
          history
            .slice(0, 20)
            .map(
              (entry) => (
                <div
                  key={entry.id}
                  className="rounded-lg border border-slate-800 p-3"
                >
                  <div className="text-xs text-slate-200">
                    {entry.transitionId}
                  </div>

                  <div className="mt-1 text-[11px] text-slate-500">
                    {entry.fromState}
                    {" → "}
                    {entry.toState ??
                      "blocked"}
                  </div>

                  <div className="mt-1 text-[10px] text-slate-600">
                    {entry.outcome}
                    {" · "}
                    {entry.occurredAt}
                  </div>

                  {entry.reasons.length ? (
                    <div className="mt-1 text-[10px] text-amber-500">
                      {entry.reasons.join(
                        " | ",
                      )}
                    </div>
                  ) : null}
                </div>
              ),
            )
        )}
      </div>
    </section>
  );
}
