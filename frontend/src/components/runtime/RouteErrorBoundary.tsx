import { Link, useRouteError } from "react-router"
import { RouteFallback } from "./RouteFallback"

export function RouteErrorBoundary() {
  const error = useRouteError()

  let message =
    "An unexpected route error prevented this workspace from rendering."

  if (
    typeof error === "object" &&
    error !== null &&
    "statusText" in error &&
    typeof error.statusText === "string"
  ) {
    message = error.statusText
  }

  return (
    <RouteFallback
      title="Route boundary"
      message={message}
      action={
        <Link
          to="/"
          className="inline-flex rounded-xl border border-kiri-blue-500/20 bg-kiri-blue-500/[0.07] px-4 py-2.5 text-xs font-bold text-kiri-blue-400 transition hover:bg-kiri-blue-500/[0.12]"
        >
          Return to dashboard
        </Link>
      }
    />
  )
}
