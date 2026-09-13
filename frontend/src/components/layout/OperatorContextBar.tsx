import { useLocation } from "react-router"
import { navigationItems } from "../navigation/navigation"

export function OperatorContextBar() {
  const location = useLocation()

  const item =
    navigationItems.find(
      (candidate) =>
        candidate.path === location.pathname ||
        (
          candidate.path !== "/" &&
          location.pathname.startsWith(`${candidate.path}/`)
        ),
    ) ?? navigationItems[0]

  return (
    <div className="flex flex-col justify-between gap-3 border-b border-white/7 px-4 py-3 sm:flex-row sm:items-center lg:px-6">
      <div>
        <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-kiri-text-muted">
          Operator workspace
        </div>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs font-semibold text-kiri-text">
            {item.label}
          </span>

          <span className="text-[10px] text-kiri-text-muted">
            /
          </span>

          <span className="text-[10px] text-kiri-text-muted">
            {item.description}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.13em] text-kiri-text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-kiri-green shadow-[0_0_10px_rgba(37,201,149,.55)]" />
        UI runtime
      </div>
    </div>
  )
}
