import {
  createPropertiesViewModel,
} from "../../../features/properties/ui/runtime/createPropertiesViewModel";

export function PropertiesOperationalHeader() {
  const model =
    createPropertiesViewModel();

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
          KiriLock operations
        </div>

        <h1 className="mt-1 text-xl font-semibold text-slate-100">
          {model.title}
        </h1>

        <div className="mt-1 text-xs text-slate-500">
          State: {model.status}
        </div>
      </div>

      <div className="text-xs text-slate-500">
        Actions: {model.actions.length}
      </div>
    </div>
  );
}
