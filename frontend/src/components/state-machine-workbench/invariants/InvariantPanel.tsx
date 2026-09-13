import {
  selectStateInvariants,
} from "../../../application/stateMachine/selectors/selectInvariants";

interface Props {
  domain: string;
}

export function InvariantPanel({
  domain,
}: Props) {
  const invariants =
    selectStateInvariants(
      domain,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        State invariants
      </div>

      <div className="mt-3 space-y-2">
        {invariants.map(
          (invariant) => (
            <div
              key={invariant.id}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs text-slate-200">
                {invariant.label}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {invariant.description}
              </div>

              <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-600">
                severity:{" "}
                {invariant.severity}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
