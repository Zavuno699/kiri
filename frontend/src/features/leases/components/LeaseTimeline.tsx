import type { LeaseTimelineItem } from "../types/lease"

interface LeaseTimelineProps {
  items: LeaseTimelineItem[]
}

function formatDate(value: string) {
  if (!value) return "—"

  return new Intl.DateTimeFormat("en-UG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value))
}

export function LeaseTimeline({
  items,
}: LeaseTimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="flex gap-4"
        >
          <div className="flex flex-col items-center">
            <span
              className={[
                "mt-1 size-3 rounded-full border-2",
                item.state === "complete"
                  ? "border-kiri-green bg-kiri-green/70"
                  : item.state === "current"
                    ? "border-kiri-blue-400 bg-kiri-blue-400"
                    : "border-kiri-text-muted bg-transparent",
              ].join(" ")}
            />

            {index < items.length - 1 ? (
              <span className="mt-2 h-full w-px bg-white/8" />
            ) : null}
          </div>

          <div className="pb-5">
            <div className="text-sm font-semibold text-kiri-text">
              {item.label}
            </div>
            <div className="mt-1 text-xs text-kiri-text-muted">
              {formatDate(item.date)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
