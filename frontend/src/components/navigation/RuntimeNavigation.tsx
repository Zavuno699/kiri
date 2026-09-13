import { Link } from "react-router-dom"
import {
  applicationNavigation,
} from "../../runtime/navigation/applicationNavigation"

export function RuntimeNavigation() {
  return (
    <nav className="flex flex-wrap gap-2">
      {applicationNavigation
        .filter((item) => item.enabled)
        .map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="rounded-lg border border-white/7 px-3 py-2 text-xs font-semibold text-kiri-text-muted transition hover:border-kiri-blue-500/30 hover:text-kiri-text"
          >
            {item.label}
          </Link>
        ))}
    </nav>
  )
}
