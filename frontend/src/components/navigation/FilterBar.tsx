interface FilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  placeholder?: string
  resultLabel?: string
}

export function FilterBar({
  search,
  onSearchChange,
  placeholder = "Search...",
  resultLabel,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/7 bg-kiri-900/65 p-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <input
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/8 bg-kiri-950/70 px-4 py-3 text-sm text-kiri-text outline-none placeholder:text-kiri-text-muted focus:border-kiri-blue-500/40"
        />
      </div>

      {resultLabel ? (
        <span className="px-2 text-xs text-kiri-text-muted">
          {resultLabel}
        </span>
      ) : null}
    </div>
  )
}
