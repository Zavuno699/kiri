import type { ReactNode } from "react"
import { SecondaryButton } from "../ui/operator/SecondaryButton"
import { DestructiveButton } from "../ui/operator/DestructiveButton"

export function CommandConfirmation({
  title,
  message,
  confirmLabel = "Confirm",
  onCancel,
  onConfirm,
  destructive = false,
  disabled = false,
  children,
}: {
  title: string
  message: string
  confirmLabel?: string
  onCancel: () => void
  onConfirm: () => void
  destructive?: boolean
  disabled?: boolean
  children?: ReactNode
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-black">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-kiri-text-muted">
          {message}
        </p>
      </div>

      {children ? (
        <div className="rounded-xl border border-white/7 bg-kiri-900/60 p-4">
          {children}
        </div>
      ) : null}

      <div className="flex justify-end gap-2">
        <SecondaryButton
          type="button"
          onClick={onCancel}
          disabled={disabled}
        >
          Cancel
        </SecondaryButton>

        {destructive ? (
          <DestructiveButton
            type="button"
            onClick={onConfirm}
            disabled={disabled}
          >
            {confirmLabel}
          </DestructiveButton>
        ) : (
          <button
            type="button"
            onClick={onConfirm}
            disabled={disabled}
            className="rounded-xl border border-kiri-blue-500/20 bg-kiri-blue-500/[0.08] px-4 py-3 text-xs font-bold text-kiri-blue-400 disabled:opacity-40"
          >
            {confirmLabel}
          </button>
        )}
      </div>
    </div>
  )
}
