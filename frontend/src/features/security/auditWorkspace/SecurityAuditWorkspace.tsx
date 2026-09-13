import { AuditSummaryPanel } from "../../../components/audit/summary/AuditSummaryPanel";
import { AuditTimeline } from "../../../components/audit/timeline/AuditTimeline";
import { AccessReviewPanel } from "../../../components/audit/review/AccessReviewPanel";
import { CommandReviewPanel } from "../../../components/audit/review/CommandReviewPanel";
import { OperatorReviewPanel } from "../../../components/audit/review/OperatorReviewPanel";
import { SecurityMetricsPanel } from "../../../components/audit/metrics/SecurityMetricsPanel";
import { DeniedAccessPanel } from "../../../components/audit/access/DeniedAccessPanel";
import { CommandAuditPanel } from "../../../components/audit/commands/CommandAuditPanel";

export function SecurityAuditWorkspace() {
  return (
    <div className="grid gap-4">
      <AuditSummaryPanel />

      <div className="grid gap-4 lg:grid-cols-3">
        <AccessReviewPanel />
        <CommandReviewPanel />
        <OperatorReviewPanel />
      </div>

      <SecurityMetricsPanel />

      <div className="grid gap-4 lg:grid-cols-2">
        <DeniedAccessPanel />
        <CommandAuditPanel />
      </div>

      <AuditTimeline />
    </div>
  );
}
