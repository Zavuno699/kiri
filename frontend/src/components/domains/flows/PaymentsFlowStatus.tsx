import {
  getPaymentsFlowDiagnostics,
} from "../../../features/payments/flows/diagnostics/getPaymentsFlowDiagnostics";

export function PaymentsFlowStatus() {
  const diagnostics =
    getPaymentsFlowDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Payments application flow
      </div>

      <div className="mt-2 text-xs text-slate-400">
        Query capability:{" "}
        {String(diagnostics.queryCapability)}
      </div>
    </section>
  );
}
