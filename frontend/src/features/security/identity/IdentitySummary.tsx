
import type { IdentityContext } from "../../../application/security/identity/identityContext";

interface IdentitySummaryProps {
  context: IdentityContext;
}

export function IdentitySummary({ context }: IdentitySummaryProps) {
  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
      <div className="text-sm font-semibold">Operator identity</div>
      <div className="mt-2 text-xs text-slate-400">
        {context.principal ?? "Unauthenticated"}
      </div>
    </section>
  );
}

