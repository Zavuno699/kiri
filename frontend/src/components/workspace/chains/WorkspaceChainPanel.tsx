import {
  getWorkspaceContext,
} from "../../../application/workspace/context/getWorkspaceContext";

export function WorkspaceChainPanel() {
  const context =
    getWorkspaceContext();

  const chain =
    [
      context.propertyId,
      context.leaseId,
      context.paymentId,
      context.deviceId,
      context.lockId,
    ].filter(
      Boolean,
    ).length;

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Cross-domain resource chain
      </div>

      <div className="mt-2 text-xs text-slate-500">
        Linked resources: {chain}
      </div>
    </section>
  );
}
