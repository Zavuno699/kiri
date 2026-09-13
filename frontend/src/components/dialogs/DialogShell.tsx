import type { ReactNode } from "react"
import { OverlayBackdrop } from "../overlays/OverlayBackdrop"

export function DialogShell({
  title,
  description,
  children,
  onClose,
}: {
  title: string
  description?: string
  children: ReactNode
  onClose?: () => void
}) {
  return (
    <OverlayBackdrop onClose={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        className="w-full max-w-lg rounded-3xl border border-white/8 bg-kiri-950 p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-black">
              {title}
            </h2>

            {description ? (
              <p className="mt-2 text-xs leading-5 text-kiri-text-muted">
                {description}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/7 px-2.5 py-1.5 text-xs text-kiri-text-muted hover:text-kiri-text"
          >
            Close
          </button>
        </div>

        <div className="mt-6">
          {children}
        </div>
      </section>
    </OverlayBackdrop>
  )
}
