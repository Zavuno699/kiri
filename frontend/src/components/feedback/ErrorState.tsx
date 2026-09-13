interface ErrorStateProps {
  title?: string
  message: string
}

export function ErrorState({
  title = "Unable to load workspace",
  message,
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-kiri-red/15 bg-kiri-red/[0.04] px-5 py-8">
      <div className="text-sm font-bold text-kiri-red">
        {title}
      </div>

      <div className="mt-2 text-xs leading-5 text-kiri-text-soft">
        {message}
      </div>
    </div>
  )
}
