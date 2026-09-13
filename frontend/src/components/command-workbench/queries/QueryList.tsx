import {
  selectQueriesForDomain,
} from "../../../application/commandQuery/selectors/selectQueriesForDomain";

import {
  executeQuery,
} from "../../../application/commandQuery/runtime/executeQuery";

interface Props {
  domain: string;
  entityId?: string | null;
}

export function QueryList({
  domain,
  entityId = null,
}: Props) {
  const queries =
    selectQueriesForDomain(
      domain,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Available queries
      </div>

      <div className="mt-3 space-y-2">
        {queries.map(
          (query) => (
            <button
              key={query.id}
              type="button"
              disabled={
                !query.enabled
              }
              onClick={() =>
                executeQuery({
                  queryId:
                    query.id,
                  entityId,
                  domain,
                  parameters:
                    {},
                  requestedAt:
                    new Date().toISOString(),
                })
              }
              className="w-full rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-left transition hover:border-blue-500/40 disabled:opacity-40"
            >
              <div className="text-xs font-medium text-slate-200">
                {query.label}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {query.description}
              </div>
            </button>
          ),
        )}
      </div>
    </section>
  );
}
