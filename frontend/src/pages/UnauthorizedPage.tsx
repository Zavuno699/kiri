import { Link } from "react-router"

export function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-kiri-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 grid size-20 place-items-center rounded-full bg-red-500/10 mx-auto">
          <svg
            className="size-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-kiri-text">
          Access Denied
        </h1>
        <p className="mb-6 text-sm text-kiri-text-muted">
          You don't have permission to access this resource.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-xl bg-kiri-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(47,107,255,0.3)] transition hover:bg-kiri-blue-500 hover:shadow-[0_0_30px_rgba(47,107,255,0.4)]"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}
