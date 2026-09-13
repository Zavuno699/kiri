export function RuntimeAuditBadge({
  blocked,
  failed,
}: {
  blocked: number
  failed: number
}) {
  return (
    <div className="flex gap-2 text-[10px] uppercase tracking-wider">
      <span className="text-kiri-amber-300">
        blocked {blocked}
      </span>
      <span className="text-kiri-red-300">
        failed {failed}
      </span>
    </div>
  )
}
