export function LeaseDetailFields({
  fields,
}: {
  fields: Array<{
    id: string
    label: string
    value: string | number
  }>
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {fields.map((field) => (
        <div
          key={field.id}
          className="rounded-xl border border-white/7 p-4"
        >
          <div className="text-[10px] uppercase tracking-wider text-kiri-text-muted">
            {field.label}
          </div>
          <div className="mt-1 text-sm font-semibold text-kiri-text">
            {field.value}
          </div>
        </div>
      ))}
    </div>
  )
}
