import type {
  AuthorizationContext,
} from "../../../application/policyDecision/contracts/authorizationContext";

import {
  evaluateAuthorization,
} from "../../../application/policyDecision/authorization/evaluateAuthorization";

interface Props {
  domain: string;
  action: string;
  context?: AuthorizationContext;
}

export function AuthorizationPanel({
  domain,
  action,
  context = {
    subjectId:
      "operator",
    authenticated:
      true,
    roles:
      ["operator"],
    capabilities:
      [action],
    domains:
      [domain, "global"],
    elevated:
      true,
  },
}: Props) {
  const result =
    evaluateAuthorization(
      context,
      domain,
      action,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Authorization
      </div>

      <div className="mt-3 text-sm">
        {result.status}
      </div>

      {result.reasons.length ? (
        <div className="mt-2 space-y-1 text-xs text-amber-500">
          {result.reasons.map(
            (reason) => (
              <div
                key={reason}
              >
                {reason}
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="mt-2 text-xs text-emerald-400">
          Authorization prerequisites satisfied.
        </div>
      )}
    </section>
  );
}
