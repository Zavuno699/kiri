export function PropertyCommandButton({
  label,
  disabled = false,
}: {
  label: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-kiri-text disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  )
}
