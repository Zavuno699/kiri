import {
  selectRiskAssessment,
} from "../../../application/policyDecision/selectors/selectRiskAssessment";

interface Props {
  domain: string;
  action: string;
  confirmed?: boolean;
}

export function RiskPanel({
  domain,
  action,
  confirmed =
    false,
}: Props) {
  const risk =
    selectRiskAssessment(
      action,
      domain,
      confirmed,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Risk assessment
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="text-lg font-semibold text-slate-100">
          {risk.level}
        </div>

        <div className="text-xs text-slate-500">
          score {risk.score}
        </div>
      </div>

      <div className="mt-3 space-y-1 text-xs text-slate-400">
        {risk.factors.length ? (
          risk.factors.map(
            (factor) => (
              <div
                key={factor}
              >
                {factor}
              </div>
            ),
          )
        ) : (
          <div>
            No elevated risk factors.
          </div>
        )}
      </div>

      <div className="mt-3 text-[11px] text-slate-500">
        confirmation:{" "}
        {risk.requiresConfirmation
          ? "required"
          : "not required"}
        {" · "}
        elevation:{" "}
        {risk.requiresElevation
          ? "required"
          : "not required"}
      </div>
    </section>
  );
}
