export function SecurityLockPanel({
  lockId,
  permitted,
}: {
  lockId: string
  permitted: boolean
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Security / lock policy
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        Lock {lockId}
      </div>
      <div className="mt-1 text-sm font-bold text-kiri-text">
        {permitted ? "Policy satisfied" : "Policy blocked"}
      </div>
    </section>
  )
}
