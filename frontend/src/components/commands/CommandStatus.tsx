import { StatusPill } from "../ui/StatusPill"

export function CommandStatus({
  state,
}: {
  state:
    | "draft"
    | "validating"
    | "authorized"
    | "submitted"
    | "accepted"
    | "rejected"
    | "unknown"
}) {
  const map = {
    draft: ["Draft", "default"],
    validating: ["Validating", "info"],
    authorized: ["Authorized", "success"],
    submitted: ["Submitted", "info"],
    accepted: ["Accepted", "success"],
    rejected: ["Rejected", "danger"],
    unknown: ["Unknown", "default"],
  } as const

  const [label, tone] = map[state]

  return (
    <StatusPill
      label={label}
      tone={tone}
    />
  )
}
