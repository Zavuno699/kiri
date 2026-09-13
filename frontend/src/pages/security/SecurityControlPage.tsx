
import { SecurityStatePanel } from "../../components/security/SecurityStatePanel";
import { SessionStatePanel } from "../../components/security/session/SessionStatePanel";
import { CapabilityStatePanel } from "../../components/security/access/CapabilityStatePanel";
import { SecurityAuditPanel } from "../../components/security/audit/SecurityAuditPanel";

export function SecurityControlPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SecurityStatePanel />
      <SessionStatePanel />
      <CapabilityStatePanel />
      <SecurityAuditPanel />
    </div>
  );
}

