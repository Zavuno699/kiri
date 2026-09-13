export function RelationChips({
  relations,
}: {
  relations: Array<{
    id: string
    label: string
    domain: string
  }>
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {relations.map((relation) => (
        <span
          key={relation.id}
          className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-kiri-text-muted"
        >
          {relation.domain}: {relation.label}
        </span>
      ))}
    </div>
  )
}
