import {
  createLocksViewModel,
} from "../../../features/locks/ui/runtime/createLocksViewModel";

export function LocksOperationalState() {
  const model =
    createLocksViewModel();

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-medium">
        Operational state
      </div>

      <div className="mt-2 text-xs text-slate-500">
        {model.status === "ready"
          ? "Live data available"
          : model.status === "stale"
            ? "Data requires refresh"
            : model.status === "error"
              ? model.error ?? "Runtime error"
              : "Waiting for data"}
      </div>
    </div>
  );
}
