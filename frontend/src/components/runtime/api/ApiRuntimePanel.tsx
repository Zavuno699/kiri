import {
  getApiResourceDiagnostics,
} from "../../../application/api/diagnostics/apiResourceDiagnostics";

import {
  getApiCoverageSnapshot,
} from "../../../application/api/diagnostics/apiCoverageSnapshot";

export function ApiRuntimePanel() {
  const diagnostics =
    getApiResourceDiagnostics();

  const coverage =
    getApiCoverageSnapshot();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Canonical API runtime
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-4">
        <div>
          Resources:{" "}
          {diagnostics.resourceCount}
        </div>

        <div>
          Verified:{" "}
          {coverage.backendVerified}
        </div>

        <div>
          Writable:{" "}
          {coverage.writable}
        </div>

        <div>
          Commandable:{" "}
          {coverage.commandable}
        </div>
      </div>
    </section>
  );
}
