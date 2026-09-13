import {
  listRuntimeSubsystems,
} from "../../../application/unifiedRuntime/registry/unifiedRuntimeRegistry";

export function RuntimeSubsystemPanel() {
  const subsystems =
    listRuntimeSubsystems();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Runtime subsystems
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {subsystems.map((subsystem) => (
          <div
            key={subsystem.key}
            className="rounded-lg border border-slate-800/60 p-3"
          >
            <div className="text-xs text-slate-300">
              {subsystem.key}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              {subsystem.category} ·{" "}
              {subsystem.required
                ? "required"
                : "optional"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
