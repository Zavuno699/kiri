export function RuntimeNotificationCenter({
  count,
}: {
  count: number
}) {
  return (
    <div className="rounded-lg border border-white/7 px-3 py-2 text-xs text-kiri-text">
      Notifications
      <span className="ml-2 rounded-full bg-kiri-blue-500/15 px-2 py-0.5 text-kiri-blue-300">
        {count}
      </span>
    </div>
  )
}
