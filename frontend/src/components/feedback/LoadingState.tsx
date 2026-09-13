interface LoadingStateProps {
  label?: string
}

export function LoadingState({
  label = "Loading operational data...",
}: LoadingStateProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/7 bg-kiri-900/60 px-5 py-5">
      <span className="h-2 w-2 animate-pulse rounded-full bg-kiri-blue-400" />

      <span className="text-xs text-kiri-text-muted">
        {label}
      </span>
    </div>
  )
}
