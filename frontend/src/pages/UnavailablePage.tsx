interface UnavailablePageProps {
  title: string
  message: string
}

export function UnavailablePage({
  title,
  message,
}: UnavailablePageProps) {
  return (
    <div className="flex min-h-[55vh] items-center justify-center p-8">
      <div className="kiri-panel max-w-2xl rounded-3xl p-8">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-amber">
          Integration boundary
        </div>

        <h1 className="mt-3 text-2xl font-black">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-kiri-text-muted">
          {message}
        </p>
      </div>
    </div>
  )
}
