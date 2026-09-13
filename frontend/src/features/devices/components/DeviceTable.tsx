import type { DeviceRecord } from "../types/device"
import {
  DeviceConnectionStatusPill,
  DeviceHealthStatusPill,
} from "./DeviceStatus"

interface DeviceTableProps {
  devices: DeviceRecord[]
  onSelect?: (device: DeviceRecord) => void
}

export function DeviceTable({
  devices,
  onSelect,
}: DeviceTableProps) {
  if (devices.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
        <div className="text-sm font-semibold text-kiri-text-soft">
          No device records available
        </div>

        <div className="mt-1 text-xs text-kiri-text-muted">
          Device telemetry will appear when the device API is connected.
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/7">
      <table className="w-full min-w-[1050px] border-collapse text-left">
        <thead className="bg-kiri-900">
          <tr className="border-b border-white/7">
            {[
              "Device",
              "Connection",
              "Health",
              "Battery",
              "Property",
              "Lock",
              "Firmware",
              "",
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-kiri-text-muted"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {devices.map((device) => (
            <tr
              key={device.id}
              className="border-b border-white/5 last:border-b-0"
            >
              <td className="px-4 py-4">
                <div className="text-sm font-bold text-kiri-text">
                  {device.name}
                </div>

                <div className="mt-1 font-mono text-[10px] text-kiri-text-muted">
                  {device.id}
                </div>

                {device.serialNumber ? (
                  <div className="mt-1 font-mono text-[10px] text-kiri-blue-400">
                    {device.serialNumber}
                  </div>
                ) : null}
              </td>

              <td className="px-4 py-4">
                <DeviceConnectionStatusPill
                  status={device.connectionStatus}
                />
              </td>

              <td className="px-4 py-4">
                <DeviceHealthStatusPill
                  status={device.healthStatus}
                />
              </td>

              <td className="px-4 py-4 text-sm text-kiri-text-soft">
                {device.batteryPercent == null
                  ? "—"
                  : `${device.batteryPercent}%`}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-muted">
                {device.propertyId ?? "—"}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-muted">
                {device.lockId ?? "—"}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-muted">
                {device.firmwareVersion ?? "—"}
              </td>

              <td className="px-4 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onSelect?.(device)}
                  className="rounded-lg border border-white/8 px-3 py-2 text-xs font-semibold text-kiri-text-soft transition hover:border-kiri-blue-500/30 hover:text-kiri-blue-400"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
