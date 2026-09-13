
import type { AuthorizationResult } from "../../../application/security/authorization/authorizationDecision";

interface AuthorizationDecisionPanelProps {
  result: AuthorizationResult | null;
}

export function AuthorizationDecisionPanel({
  result,
}: AuthorizationDecisionPanelProps) {
  if (!result) {
    return null;
  }

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
      <div className="text-sm font-semibold">Authorization decision</div>
      <div className="mt-2 text-xs text-slate-400">
        {result.decision}: {result.reason}
      </div>
    </section>
  );
}

