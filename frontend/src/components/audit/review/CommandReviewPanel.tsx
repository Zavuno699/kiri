import {
  listAuditEvents,
} from "../../../application/audit/store/auditStore";

import {
  buildCommandReview,
} from "../../../application/audit/review/commandReview";

export function CommandReviewPanel() {
  const review = buildCommandReview(
    listAuditEvents(),
  );

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Command review
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400">
        <div>Total: {review.total}</div>
        <div>Successful: {review.successful}</div>
        <div>Denied: {review.denied}</div>
        <div>Failed: {review.failed}</div>
        <div>Cancelled: {review.cancelled}</div>
      </div>
    </section>
  );
}
