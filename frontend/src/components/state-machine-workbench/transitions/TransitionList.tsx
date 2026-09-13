import {
  selectAvailableTransitions,
} from "../../../application/stateMachine/selectors/selectAvailableTransitions";

import {
  executeAndAuditTransition,
} from "../../../application/stateMachine/runtime/executeAndAuditTransition";

interface Props {
  domain: string;
  entityId: string;
  currentState: string;
  context?: Record<
    string,
    unknown
  >;
}

export function TransitionList({
  domain,
  entityId,
  currentState,
  context = {},
}: Props) {
  const transitions =
    selectAvailableTransitions(
      domain,
      currentState,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Available transitions
      </div>

      <div className="mt-3 space-y-2">
        {transitions.length ===
        0 ? (
          <div className="text-xs text-slate-500">
            No legal transitions from this state.
          </div>
        ) : (
          transitions.map(
            (transition) => (
              <button
                key={transition.id}
                type="button"
                onClick={() =>
                  executeAndAuditTransition({
                    domain,
                    entityId,
                    transitionId:
                      transition.id,
                    currentState,
                    subjectId:
                      "operator",
                    confirmed:
                      true,
                    context: {
                      authenticated:
                        true,
                      leaseActive:
                        true,
                      deviceOperational:
                        true,
                      lockControllable:
                        true,
                      securityClear:
                        true,
                      paymentConsistent:
                        true,
                      propertyOperational:
                        true,
                      securityControlsAvailable:
                        true,
                      ...context,
                    },
                    correlationId:
                      crypto.randomUUID(),
                  })
                }
                className="w-full rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-left hover:border-blue-500/40"
              >
                <div className="text-xs text-slate-200">
                  {transition.label}
                </div>

                <div className="mt-1 text-[11px] text-slate-500">
                  {currentState}
                  {" → "}
                  {transition.toState}
                </div>

                <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-600">
                  {transition.guarded
                    ? "guarded"
                    : "unguarded"}
                  {" · "}
                  {transition.reversible
                    ? "reversible"
                    : "terminal-path"}
                </div>
              </button>
            ),
          )
        )}
      </div>
    </section>
  );
}
