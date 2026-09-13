import type { ReactNode } from "react"

export function DeviceWorkspaceLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="space-y-5">
      <header>
        <div className="text-[10px] uppercase tracking-[0.18em] text-kiri-blue-400">
          Devices
        </div>
        <h1 className="mt-1 text-2xl font-black text-kiri-text">
          Devices workspace
        </h1>
      </header>
      {children}
    </div>
  )
}
