import { securityRuntimeReady } from "../../../application/security/runtime/runtimeReadiness";

export function PolicyStatusPanel() {
  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
      <div className="text-sm font-semibold">Policy enforcement</div>
      <div className="mt-2 text-xs text-slate-400">
        Runtime policy ready: {String(securityRuntimeReady())}
      </div>
    </section>
  );
}
