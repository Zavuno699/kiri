import type {
  EntityFacet,
} from "../../../application/operationalViews/contracts/entityFacet";

interface Props {
  facets: EntityFacet[];
}

export function EntityFacetGrid({
  facets,
}: Props) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {facets.map(
        (facet) => (
          <div
            key={facet.key}
            className="rounded-lg border border-slate-800 bg-slate-950/40 p-3"
          >
            <div className="text-[11px] uppercase tracking-wider text-slate-500">
              {facet.label}
            </div>

            <div className="mt-1 text-sm text-slate-200">
              {facet.value}
            </div>
          </div>
        ),
      )}
    </div>
  );
}
