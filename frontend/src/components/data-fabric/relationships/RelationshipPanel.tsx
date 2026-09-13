import {
  listRelationships,
} from "../../../application/dataFabric/relationships/relationshipStore";

export function RelationshipPanel() {
  const relationships =
    listRelationships();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold">
        Entity relationships
      </div>

      <div className="mt-3 space-y-2">
        {relationships
          .slice(0, 12)
          .map(
            (relationship) => (
              <div
                key={relationship.id}
                className="rounded-lg border border-slate-800 p-3"
              >
                <div className="text-xs text-slate-300">
                  {relationship.source.type}
                  {" → "}
                  {relationship.target.type}
                </div>

                <div className="mt-1 text-[11px] text-slate-500">
                  {relationship.type}
                </div>
              </div>
            ),
          )}
      </div>
    </section>
  );
}
