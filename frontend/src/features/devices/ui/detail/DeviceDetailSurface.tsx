import { DeviceDetailFields } from "./deviceDetailFields"

export function DeviceDetailSurface({
  id,
  status,
  online,
  firmwareVersion,
  lastSeenAt,
}: {
  id: string
  status: string
  online: string
  firmwareVersion: string
  lastSeenAt: string
}) {
  return (
    <DeviceDetailFields
      fields={[
        { id: "id", label: "Device", value: id },
        { id: "status", label: "Status", value: status },
        { id: "online", label: "Connectivity", value: online },
        {
          id: "firmware",
          label: "Firmware",
          value: firmwareVersion,
        },
        {
          id: "lastSeen",
          label: "Last seen",
          value: lastSeenAt,
        },
      ]}
    />
  )
}
