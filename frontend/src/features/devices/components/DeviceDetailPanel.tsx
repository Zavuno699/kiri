import type { DeviceRecord } from "../types/device"
import {
  DeviceConnectionStatusPill,
  DeviceHealthStatusPill,
} from "./DeviceStatus"

interface DeviceDetailPanelProps {
  device: DeviceRecord
}

export function DeviceDetailPanel({
  device,
}: DeviceDetailPanelProps) {
  return (
    <section className="kiri-panel rounded-3xl p-6">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
        Device detail
      </div>

      <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h3 className="text-2xl font-black">
            {device.name}
          </h3>

          <div className="mt-1 font-mono text-xs text-kiri-text-muted">
            {device.id}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <DeviceConnectionStatusPill
            status={device.connectionStatus}
          />

          <DeviceHealthStatusPill
            status={device.healthStatus}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Serial number", device.serialNumber ?? "—"],
          ["Property", device.propertyId ?? "—"],
          ["Lock", device.lockId ?? "—"],
          ["Battery", device.batteryPercent == null ? "—" : `${device.batteryPercent}%`],
          ["Firmware", device.firmwareVersion ?? "—"],
          ["Last seen", device.lastSeenAt ? new Date(device.lastSeenAt).toLocaleString("en-UG") : "—"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-white/7 bg-kiri-900/65 p-3"
          >
            <div className="text-[10px] uppercase tracking-[0.13em] text-kiri-text-muted">
              {label}
            </div>

            <div className="mt-1 break-words text-sm text-kiri-text-soft">
              {value}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
