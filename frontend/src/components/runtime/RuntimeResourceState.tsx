export function RuntimeResourceState({
  state,
}: {
  state: string
}) {
  return (
    <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-kiri-text-muted">
      {state}
    </span>
  )
}
