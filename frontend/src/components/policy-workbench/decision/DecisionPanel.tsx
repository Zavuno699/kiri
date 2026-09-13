import {
  useMemo,
} from "react";

import {
  evaluateAndAuditDecision,
} from "../../../application/policyDecision/runtime/evaluateAndAuditDecision";

interface Props {
  domain: string;
  action: string;
  entityId?: string | null;
  state?: Record<
    string,
    unknown
  >;
  confirmed?: boolean;
}

export function DecisionPanel({
  domain,
  action,
  entityId =
    null,
  state =
    {},
  confirmed =
    false,
}: Props) {
  const result =
    useMemo(
      () =>
        evaluateAndAuditDecision({
          action,
          domain,
          entityId,
          authorization: {
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
          state,
          parameters:
            {},
          confirmed,
        }),
      [
        action,
        domain,
        entityId,
        state,
        confirmed,
      ],
    );

  const decision =
    result.decision;

  return (
    <section className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Final policy decision
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="text-xl font-semibold text-slate-100">
          {decision.outcome}
        </div>

        <div className="text-xs text-slate-500">
          {decision.allowed
            ? "operation allowed"
            : "operation not allowed"}
        </div>
      </div>

      <div className="mt-3 space-y-1 text-xs text-slate-400">
        {decision.reasons.length ? (
          decision.reasons.map(
            (reason) => (
              <div
                key={reason}
              >
                {reason}
              </div>
            ),
          )
        ) : (
          <div>
            All policy inputs satisfied.
          </div>
        )}
      </div>

      <div className="mt-3 grid gap-2 text-[11px] text-slate-500 sm:grid-cols-2">
        <div>
          Policy rules:{" "}
          {decision.policyIds.length}
        </div>

        <div>
          Guards:{" "}
          {decision.guardIds.length}
        </div>

        <div>
          Risk:{" "}
          {decision.risk.level}
        </div>

        <div>
          Audit:{" "}
          {result.auditId}
        </div>
      </div>
    </section>
  );
}
