interface OperationsTableProps {
  rows: Array<{
    id: string
    domain: string
    operation: string
    state: string
    owner: string
  }>
}

export function OperationsTable({
  rows,
}: OperationsTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/7">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <thead className="bg-kiri-900">
          <tr className="border-b border-white/7">
            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-kiri-text-muted">
              Reference
            </th>
            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-kiri-text-muted">
              Domain
            </th>
            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-kiri-text-muted">
              Operation
            </th>
            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-kiri-text-muted">
              State
            </th>
            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-kiri-text-muted">
              Owner
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-10 text-center text-sm text-kiri-text-muted"
              >
                No operational records available.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-white/5 last:border-b-0"
              >
                <td className="px-4 py-4 font-mono text-[11px] text-kiri-blue-400">
                  {row.id}
                </td>
                <td className="px-4 py-4 text-xs text-kiri-text-soft">
                  {row.domain}
                </td>
                <td className="px-4 py-4 text-xs font-semibold text-kiri-text">
                  {row.operation}
                </td>
                <td className="px-4 py-4 text-xs text-kiri-text-soft">
                  {row.state}
                </td>
                <td className="px-4 py-4 text-xs text-kiri-text-muted">
                  {row.owner}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
