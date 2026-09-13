import { StatusPill } from "../ui/StatusPill"

export function ApiAvailabilityPill({
  available,
  label = "API",
}: {
  available: boolean
  label?: string
}) {
  return (
    <StatusPill
      label={
        available
          ? `${label} connected`
          : `${label} unavailable`
      }
      tone={available ? "success" : "warning"}
    />
  )
}
