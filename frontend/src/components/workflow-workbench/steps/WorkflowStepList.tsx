import {
  selectWorkflowSteps,
} from "../../../application/workflowOrchestration/selectors/selectWorkflowSteps";

interface Props {
  workflowId: string;
}

export function WorkflowStepList({
  workflowId,
}: Props) {
  const steps =
    selectWorkflowSteps(
      workflowId,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Workflow steps
      </div>

      <div className="mt-3 space-y-2">
        {steps.map(
          (step) => (
            <div
              key={step.id}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-600">
                  #{step.order}
                </span>

                <span className="text-xs text-slate-200">
                  {step.name}
                </span>
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {step.type}
                {" · "}
                {step.domain}
                {" · "}
                {step.action}
              </div>

              <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-600">
                {step.required
                  ? "required"
                  : "optional"}
                {" · "}
                {step.compensatable
                  ? "compensatable"
                  : "non-compensatable"}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
