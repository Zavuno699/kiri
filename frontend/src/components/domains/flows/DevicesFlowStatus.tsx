import {
  getDevicesFlowDiagnostics,
} from "../../../features/devices/flows/diagnostics/getDevicesFlowDiagnostics";

export function DevicesFlowStatus() {
  const diagnostics =
    getDevicesFlowDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Devices application flow
      </div>

      <div className="mt-2 text-xs text-slate-400">
        Read capability:{" "}
        {diagnostics.readCapability}
      </div>
    </section>
  );
}
