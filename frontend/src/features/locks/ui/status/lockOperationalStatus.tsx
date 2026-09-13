import { EntityStatus } from "../../../../components/operator/status/EntityStatus"

export function LockOperationalStatus({
  status,
}: {
  status: string
}) {
  const normalized = status.toLowerCase()

  const tone =
    normalized.includes("fail") ||
    normalized.includes("blocked") ||
    normalized.includes("error")
      ? "critical"
      : normalized.includes("degrad") ||
          normalized.includes("pending")
        ? "warning"
        : "normal"

  return (
    <EntityStatus
      label={status}
      tone={tone}
    />
  )
}
