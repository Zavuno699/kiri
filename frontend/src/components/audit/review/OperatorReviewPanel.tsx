import {
  listAuditEvents,
} from "../../../application/audit/store/auditStore";

import {
  buildOperatorReview,
} from "../../../application/audit/review/operatorReview";

export function OperatorReviewPanel() {
  const review = buildOperatorReview(
    listAuditEvents(),
  );

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Operator review
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400">
        <div>Principals: {review.principals}</div>
        <div>Actions: {review.actions}</div>
        <div>Denied: {review.deniedActions}</div>
        <div>
          Latest activity:{" "}
          {review.latestActivityAt ?? "none"}
        </div>
      </div>
    </section>
  );
}
