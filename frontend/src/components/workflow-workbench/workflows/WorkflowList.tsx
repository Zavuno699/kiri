import {
  selectWorkflows,
} from "../../../application/workflowOrchestration/selectors/selectWorkflows";

interface Props {
  domain?: string;
}

export function WorkflowList({
  domain,
}: Props) {
  const workflows =
    selectWorkflows(
      domain,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Available workflows
      </div>

      <div className="mt-3 space-y-2">
        {workflows.map(
          (workflow) => (
            <div
              key={workflow.id}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs text-slate-200">
                {workflow.label}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {workflow.description}
              </div>

              <div className="mt-2 text-[10px] uppercase tracking-wider text-slate-600">
                {workflow.risk}
                {" · "}
                {workflow.transactional
                  ? "transactional"
                  : "non-transactional"}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
