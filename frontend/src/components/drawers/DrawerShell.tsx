import type { ReactNode } from "react"

export function DrawerShell({
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
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl border-l border-white/8 bg-kiri-950 shadow-2xl">
      <div className="flex h-full flex-col">
        <header className="border-b border-white/7 p-5">
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
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  )
}
