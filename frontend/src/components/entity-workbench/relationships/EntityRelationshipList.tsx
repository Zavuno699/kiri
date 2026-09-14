import {
  queryRelationships,
} from "../../../application/dataFabric/runtime/query/queryRelationships";

interface Props {
  entityId: string | null;
}

export function EntityRelationshipList({
  entityId,
}: Props) {
  const relationships =
    entityId
      ? queryRelationships(
          entityId,
        )
      : [];

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Relationships
      </div>

      <div className="mt-3 space-y-2">
        {relationships.length ===
        0 ? (
          <div className="text-xs text-slate-500">
            No relationships resolved.
          </div>
        ) : (
          relationships.map(
            (relationship) => (
              <div
                key={relationship.id}
                className="rounded-lg border border-slate-800 p-3"
              >
                <div className="text-xs text-slate-300">
                  {relationship.source.domain}
                  {" → "}
                  {relationship.target.domain}
                </div>

                <div className="mt-1 text-[11px] text-slate-500">
                  {relationship.type}
                  {" · "}
                  {relationship.active
                    ? "active"
                    : "inactive"}
                </div>
              </div>
            ),
          )
        )}
      </div>
    </section>
  );
}
