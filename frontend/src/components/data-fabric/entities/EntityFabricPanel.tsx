import {
  listEntityTypes,
} from "../../../application/dataFabric/registry/entityRegistry";

export function EntityFabricPanel() {
  const entities =
    listEntityTypes();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold">
        Canonical entities
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {entities.map(
          (entity) => (
            <div
              key={entity.type}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs text-slate-300">
                {entity.domain}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {entity.id}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
