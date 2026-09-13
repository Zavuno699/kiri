export function RouteLoading() {
  return (
    <section className="mx-auto flex min-h-[45vh] max-w-4xl items-center justify-center px-6">
      <div className="w-full max-w-xl space-y-3">
        <div className="h-2 w-24 animate-pulse rounded-full bg-kiri-blue-500/25" />
        <div className="h-8 w-2/3 animate-pulse rounded-xl bg-white/6" />
        <div className="h-24 w-full animate-pulse rounded-2xl bg-white/4" />
        <div className="h-24 w-full animate-pulse rounded-2xl bg-white/4" />
      </div>
    </section>
  )
}
