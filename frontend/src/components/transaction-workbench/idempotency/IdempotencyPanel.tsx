import {
  selectIdempotencyRecords,
} from "../../../application/transactionFabric/selectors/selectIdempotency";

export function IdempotencyPanel() {
  const records =
    selectIdempotencyRecords();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Idempotency registry
      </div>

      <div className="mt-3 space-y-2">
        {records.length ===
        0 ? (
          <div className="text-xs text-slate-500">
            No idempotency reservations.
          </div>
        ) : (
          records
            .slice(0, 15)
            .map(
              (record) => (
                <div
                  key={record.key}
                  className="rounded-lg border border-slate-800 p-3"
                >
                  <div className="text-xs text-slate-200">
                    {record.operation}
                  </div>

                  <div className="mt-1 text-[11px] text-slate-500">
                    {record.status}
                  </div>

                  <div className="mt-1 break-all text-[10px] text-slate-600">
                    {record.key}
                  </div>
                </div>
              ),
            )
        )}
      </div>
    </section>
  );
}
