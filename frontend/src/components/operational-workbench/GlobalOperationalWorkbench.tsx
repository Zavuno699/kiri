import {
  EntityWorkbench,
} from "../entity-workbench/EntityWorkbench";

export function GlobalOperationalWorkbench() {
  return (
    <section className="space-y-4">
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-blue-300/70">
          Global operations
        </div>

        <h2 className="mt-1 text-xl font-semibold text-slate-100">
          Entity Workbench
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Unified cross-domain operational context.
        </p>
      </div>

      <EntityWorkbench />
    </section>
  );
}
