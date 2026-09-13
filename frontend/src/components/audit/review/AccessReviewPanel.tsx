import {
  listAuditEvents,
} from "../../../application/audit/store/auditStore";

import {
  buildAccessReview,
} from "../../../application/audit/review/accessReview";

export function AccessReviewPanel() {
  const review = buildAccessReview(
    listAuditEvents(),
  );

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Access review
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400">
        <div>Total checks: {review.total}</div>
        <div>Allowed: {review.allowed}</div>
        <div>Denied: {review.denied}</div>
        <div>Expired: {review.expired}</div>
      </div>
    </section>
  );
}
