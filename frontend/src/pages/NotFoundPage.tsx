import { Link } from "react-router"

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-8">
      <div className="kiri-panel max-w-xl rounded-3xl p-8 text-center">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-text-muted">
          Route boundary
        </div>

        <h1 className="mt-3 text-3xl font-black">
          Workspace not found
        </h1>

        <p className="mt-3 text-sm leading-6 text-kiri-text-muted">
          The requested operator route does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl border border-kiri-blue-500/20 bg-kiri-blue-500/[0.07] px-4 py-3 text-xs font-bold text-kiri-blue-400"
        >
          Return to dashboard
        </Link>
      </div>
    </div>
  )
}
