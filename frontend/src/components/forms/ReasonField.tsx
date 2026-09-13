interface ReasonFieldProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export function ReasonField({
  value,
  onChange,
  required = true,
}: ReasonFieldProps) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-kiri-text-muted">
        Operational reason
      </span>

      <textarea
        required={required}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        rows={3}
        placeholder="Describe why this action is being performed..."
        className="mt-2 w-full rounded-xl border border-white/8 bg-kiri-950/70 px-4 py-3 text-sm text-kiri-text outline-none placeholder:text-kiri-text-muted focus:border-kiri-blue-500/40"
      />
    </label>
  )
}
