import {
  selectCompensationActions,
} from "../../../application/workflowOrchestration/selectors/selectCompensationActions";

interface Props {
  workflowId: string;
}

export function CompensationPanel({
  workflowId,
}: Props) {
  const actions =
    selectCompensationActions(
      workflowId,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Compensation paths
      </div>

      <div className="mt-3 space-y-2">
        {actions.length ===
        0 ? (
          <div className="text-xs text-slate-500">
            No compensation actions registered.
          </div>
        ) : (
          actions.map(
            (action) => (
              <div
                key={action.id}
                className="rounded-lg border border-slate-800 p-3"
              >
                <div className="text-xs text-slate-200">
                  {action.action}
                </div>

                <div className="mt-1 text-[11px] text-slate-500">
                  {action.domain}
                  {" · "}
                  {action.reason}
                </div>

                <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-600">
                  {action.enabled
                    ? "enabled"
                    : "disabled"}
                </div>
              </div>
            ),
          )
        )}
      </div>
    </section>
  );
}
