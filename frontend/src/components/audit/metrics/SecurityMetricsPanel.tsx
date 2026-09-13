import {
  getSecurityMetrics,
} from "../../../application/securityTelemetry/metrics/securityMetrics";

export function SecurityMetricsPanel() {
  const metrics = getSecurityMetrics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Security telemetry
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2">
        <div>
          Authentication attempts:{" "}
          {metrics.authenticationAttempts}
        </div>
        <div>
          Authentication failures:{" "}
          {metrics.authenticationFailures}
        </div>
        <div>
          Authorization checks:{" "}
          {metrics.authorizationChecks}
        </div>
        <div>
          Authorization denials:{" "}
          {metrics.authorizationDenials}
        </div>
        <div>
          Command attempts:{" "}
          {metrics.commandAttempts}
        </div>
        <div>
          Command denials:{" "}
          {metrics.commandDenials}
        </div>
      </div>
    </section>
  );
}
