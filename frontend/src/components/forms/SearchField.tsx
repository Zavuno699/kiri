interface SearchFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchField({
  value,
  onChange,
  placeholder = "Search...",
}: SearchFieldProps) {
  return (
    <input
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/8 bg-kiri-950/70 px-4 py-3 text-sm text-kiri-text outline-none placeholder:text-kiri-text-muted focus:border-kiri-blue-500/40"
    />
  )
}
