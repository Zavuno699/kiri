import type { ReactNode } from "react"

export function DeviceWorkspace({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="space-y-5">
      <div className="text-xs uppercase tracking-[0.18em] text-kiri-blue-400">
        Devices
      </div>
      {children}
    </div>
  )
}
