import {
  getRealtimeDiagnostics,
} from "../../../application/realtime/diagnostics/realtimeDiagnostics";

export function RealtimeRuntimePanel() {
  const diagnostics =
    getRealtimeDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Realtime runtime
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-4">
        <div>
          Connection:{" "}
          {diagnostics.connection.status}
        </div>

        <div>
          Events:{" "}
          {diagnostics.eventCount}
        </div>

        <div>
          Subscriptions:{" "}
          {diagnostics.subscriptionCount}
        </div>

        <div>
          Refresh rules:{" "}
          {diagnostics.refreshRuleCount}
        </div>
      </div>
    </section>
  );
}
