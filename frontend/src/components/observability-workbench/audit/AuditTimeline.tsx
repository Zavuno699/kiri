import {
  selectAuditTimeline,
} from "../../../application/observability/selectors/selectAuditTimeline";

interface Props {
  domain?: string;
}

export function AuditTimeline({
  domain,
}: Props) {
  const records =
    selectAuditTimeline(
      domain,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Audit timeline
      </div>

      <div className="mt-3 space-y-2">
        {records.length ===
        0 ? (
          <div className="text-xs text-slate-500">
            No audit activity observed.
          </div>
        ) : (
          records
            .slice(0, 20)
            .map(
              (record) => (
                <div
                  key={record.id}
                  className="rounded-lg border border-slate-800 p-3"
                >
                  <div className="text-xs text-slate-200">
                    {record.action}
                  </div>

                  <div className="mt-1 text-[11px] text-slate-500">
                    {record.category}
                    {" · "}
                    {record.outcome}
                  </div>

                  <div className="mt-1 text-[10px] text-slate-600">
                    {record.message}
                  </div>

                  <div className="mt-1 text-[10px] text-slate-700">
                    {record.occurredAt}
                  </div>
                </div>
              ),
            )
        )}
      </div>
    </section>
  );
}
