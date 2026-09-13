import type { ReactNode } from "react"

export function CommandBoundary({
  verified,
  children,
}: {
  verified: boolean
  children: ReactNode
}) {
  if (!verified) {
    return (
      <div className="rounded-2xl border border-kiri-amber/15 bg-kiri-amber/[0.04] p-5">
        <div className="text-sm font-bold text-kiri-amber">
          Command boundary unavailable
        </div>

        <p className="mt-2 text-xs leading-5 text-kiri-text-muted">
          This command surface is disabled until the production
          command ingress is verified.
        </p>
      </div>
    )
  }

  return <>{children}</>
}
