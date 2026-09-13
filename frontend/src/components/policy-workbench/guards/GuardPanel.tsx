import {
  selectGuards,
} from "../../../application/policyDecision/selectors/selectGuards";

interface Props {
  domain?: string;
}

export function GuardPanel({
  domain,
}: Props) {
  const guards =
    selectGuards(
      domain,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        State guards
      </div>

      <div className="mt-3 space-y-2">
        {guards.map(
          (guard) => (
            <div
              key={guard.id}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs text-slate-200">
                {guard.label}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {guard.description}
              </div>

              <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-600">
                {guard.required
                  ? "required"
                  : "optional"}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
