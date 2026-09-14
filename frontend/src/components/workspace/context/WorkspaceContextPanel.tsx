import {
  getWorkspaceContext,
} from "../../../application/workspace/context/getWorkspaceContext";

export function WorkspaceContextPanel() {
  const context =
    getWorkspaceContext();

  const entries = [
    ["Property", context.propertyId],
    ["Lease", context.leaseId],
    ["Payment", context.paymentId],
    ["Device", context.deviceId],
    ["Lock", context.lockId],
  ] as const;

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Operational context
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {entries.map(
          ([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-[11px] uppercase tracking-wide text-slate-500">
                {label}
              </div>

              <div className="mt-1 text-xs text-slate-300">
                {value ?? "Not selected"}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
