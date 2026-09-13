import {
  getApiDiagnostics,
} from "../../../application/api/canonical/diagnostics/apiDiagnostics";

import {
  getFeatureServiceDiagnostics,
} from "../../../application/featureServices/diagnostics/featureServiceDiagnostics";

export function ApiServiceGraphPanel() {
  const api =
    getApiDiagnostics();

  const services =
    getFeatureServiceDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        API / service graph
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2">
        <div>
          API resources: {api.resources}
        </div>
        <div>
          API operations: {api.operations}
        </div>
        <div>
          Authenticated operations:{" "}
          {api.authenticatedOperations}
        </div>
        <div>
          Feature services: {services.initialized}/
          {services.required}
        </div>
      </div>
    </section>
  );
}
