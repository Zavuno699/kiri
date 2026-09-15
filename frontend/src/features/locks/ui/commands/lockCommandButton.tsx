export function LockCommandButton({
  label,
  disabled = false,
  unavailable = false,
}: {
  label: string
  disabled?: boolean
  unavailable?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled || unavailable}
      className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-kiri-text disabled:cursor-not-allowed disabled:opacity-40"
      title={unavailable ? "Command not yet connected to backend" : undefined}
    >
      {unavailable ? `${label} (unavailable)` : label}
    </button>
  )
}
